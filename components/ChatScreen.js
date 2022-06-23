import styled from "styled-components";
import React from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { useEffect, useState } from "react";
import getFriendData from "../utils/getFriendData";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicNoneIcon from "@mui/icons-material/MicNone";
import { db } from "../firebase";
import { useRouter } from "next/router";
// import img from "../public/8c98994518b575bfd8c949e91d20548b.jpg";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuth } from "../Auth";
import moment from "moment";
import Message from "../components/Message";
function ChatScreen({ chat, chat_id }) {
  const [friend, setFriend] = useState({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const chatParse = JSON.parse(chat);
  const { currentUser } = useAuth();
  const route = useRouter();
  useEffect(() => {
    const messagesRef = collection(db, "chats", chat_id, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (querysnapshot) => {
      setMessages(
        querysnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc
            .data()
            .timestamp?.toDate()
            .getTime(),
        }))
      );
    });
    return unsubscribe;
  }, [chat_id]);
  useEffect(() => {
    if (chatParse.users?.length > 0) {
      getFriendData(chatParse.users).then((data) => setFriend(data));
    } else {
      console.log("without chat parse");
    }
  }, [chat_id]);
  useEffect(() => {
    if (chatParse.users?.length > 0) {
      getFriendData(chatParse.users).then((data) => setFriend(data));
    } else {
      console.log("without chatParse");
    }
  }, [chat_id]);
  const sendMessage = async (e) => {
    e.preventDefault();
    // storge user active time
    const usersRef = doc(db, "users", currentUser.uid);
    setDoc(usersRef, { lastSeen: serverTimestamp() }, { merge: true });
    //  send message
    const messagesRef = collection(db, "chats", chat_id, "messages");
    await addDoc(messagesRef, {
      timestamp: serverTimestamp(),
      message: input,
      user: currentUser.email,
      photoURL: currentUser.photoURL,
    });
    // add latest message and corresponding time
    const chatRef = doc(db, "chats", chat_id);
    setDoc(
      chatRef,
      {
        latestMessage: input,
        timestamp: serverTimestamp(),
      },
      { merge: true }
    );
    setInput("");
  };
  const backHandler = () => {
    route.replace("/");
  };
  return (
    <Container>
      <Header>
        <Avatar src={friend.photoURL} />
        <HeaderInfo>
          <h3>{friend.displayName}</h3>
          <div>Last Active {moment(friend.lastSeen?.toDate()).fromNow()}</div>
        </HeaderInfo>
        <IconButton>
          <SearchIcon color="gray" />
        </IconButton>
        <IconButton>
          <MoreVertIcon color="gray" />
        </IconButton>
        <ButtonBack onClick={backHandler}>Esc</ButtonBack>
      </Header>
      <MessageCintainer>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message.message}
            user={message.user}
            timestamp={message.timestamp}
          />
        ))}
      </MessageCintainer>
      <InputContainer>
        <IconButton>
          <InsertEmoticonIcon color="gray" />
        </IconButton>
        <IconButton>
          <AttachFileIcon color="gray" />
        </IconButton>
        <Input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          value={input}
        />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <IconButton>
          <MicNoneIcon color="gray" />
        </IconButton>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  display: flex;
  padding: 7px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
  background-color: #dcf8c6;
`;
const HeaderInfo = styled.div`
  margin-left: 15px;
  margin-bottom: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > div {
    font-size: 14px;
    color: gray;
  }
`;

const InputContainer = styled.form`
  background-color: white;
  display: flex;
  align-items: center;
  padding: 2px;
  position: sticky;
  bottom: 0px;
  z-index: 100;
  background-color: #dcf8c6;
`;
const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 30px;
  padding: 10px;
  margin-left: 15px;
  margin-right: 15px;
`;

const MessageCintainer = styled.div`
  background-image: url("/8c98994518b575bfd8c949e91d20548b.jpg");
  background-attachment: fixed;
  background-repeat: repeat;
  padding: 20px;
  background-color: #e5ded8;
  flex: 1;
`;
const ButtonBack = styled.button`
  &&& {
    font-weight: 500;
    align-items: flex-end;
  }
  background-color: transparent;
  font-weight: bold;
  border: none;
`;
