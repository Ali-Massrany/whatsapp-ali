import Loading from "./components/Loading";
import { useEffect, useContext, useState, createContext } from "react";
import { auth, db } from "./firebase";
import Login from "./components/Login";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no user");
        setCurrentUser(null);
        setLoading(false);
        return;
      }
      const token = await user.getIdToken();
      const userData = {
        displayName: user.displayName,
        email: user.email,
        lastSeen: serverTimestamp(),
        photoURL: user.photoURL,
      };
      await setDoc(doc(db, "users", user.uid), userData);
      console.log("user token ", token);
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Login />;
  } else {
    return (
      <AuthContext.Provider value={{ currentUser }}>
        {children}
      </AuthContext.Provider>
    );
  }
};
export const useAuth = () => useContext(AuthContext);
