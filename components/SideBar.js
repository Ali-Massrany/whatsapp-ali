import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import { Avatar, Button, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Friend from "./Friend";
import { auth, db } from "../firebase";
import { useAuth } from "../Auth";

import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import Chat from "./Chat";

function SideBar() {
  const [friends, setFriends] = useState([]);
  const [chats, setChats] = useState([]);
  const [seaechFriend, setSearchFriends] = useState(false);
  const inputAreaRef = useRef(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const chatRef = collection(db, "chats");
    const q = query(chatRef, where("users", "array-contains", currentUser.uid));
    const unSubscribe = onSnapshot(q, (querySnapShot) => {
      setChats(
        querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    return unSubscribe;
  }, []);

  useEffect(() => {
    async function fetchFriends() {
      const userRef = collection(db, "users");

      const q = query(userRef, where("email", "!=", currentUser?.email));
      const querySnapshot = await getDocs(q);
      setFriends(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    fetchFriends();
  }, []);
  useEffect(() => {
    const cheackIfClickedutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        setTimeout(() => {
          setSearchFriends(false);
        }, 3000);
      } else {
        setSearchFriends(true);
      }
    };
    document.addEventListener("mousedown", cheackIfClickedutside);
    return () => {
      document.removeEventListener("mousedown", cheackIfClickedutside);
    };
  }, []);

  return (
    <Container>
      <Header>
        <SignOutContainer>
          <UserAvatar
            src={currentUser.photoURL}
            onClick={() => signOut(auth)}
          />
          <ButtonSignOut onClick={() => signOut(auth)}>Sign Out</ButtonSignOut>
        </SignOutContainer>
        <IconContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconContainer>
      </Header>
      <Search>
        <SearchIcon color="gray" />
        <SearchInput ref={inputAreaRef} placeholder="Search in chats" />
      </Search>
      <SidebarButton>Start a new chat</SidebarButton>
      {/* List of chats */}
      {seaechFriend ? (
        <>
          {friends.map((friend) => (
            <Friend
              key={friend.id}
              photoURL={friend.photoURL}
              displayName={friend.displayName}
              id={friend.id}
            />
          ))}
        </>
      ) : (
        <>
          {chats.map((chat) => (
            <Chat
              key={chat.id}
              id={chat.id}
              users={chat.users}
              latestMeassage={chat.latestMeassage}
              timestamp={chat.timestamp}
            />
          ))}
        </>
      )}
    </Container>
  );
}
export default SideBar;

const Container = styled.header`
  border-right: 1px solid whitesmoke;
`;
const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    border-right: 10px solid whitesmoke;
  }
`;
const SearchInput = styled.input`
  outline-width: 0;
  border: 0;
  flex: 1;
  color: gray;
  background-color: solid whitesmoke;
`;
const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;
const Header = styled.div`
  &&& {
    background-color: #ece5dd;
  }
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;
const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;
const IconContainer = styled.div`
  color: gray;
`;
const ButtonSignOut = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: 10px;
`;
const SignOutContainer = styled.div``;
