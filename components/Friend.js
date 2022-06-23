import styled from "styled-components";
import React from "react";
import { Avatar } from "@material-ui/core";
import { useAuth } from "../Auth";
import { collection, query, where, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

function Friend({ photoURL, displayName, id }) {
  const { currentUser } = useAuth();
  const createChat = async (id) => {
    const chatsRef = collection(db, "chats");
    const q = query(
      chatsRef,
      where("users", "array-contains", currentUser.uid)
    );
    const querSnapshot = await getDocs(q);
    const chatAlreadyExist = (friend_id) =>
      !!querSnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === friend_id)?.length > 0
      );
    console.log("create chat");
    if (!chatAlreadyExist(id)) {
      addDoc(chatsRef, { users: [currentUser?.uid, id] });
    } else {
      console.log("chat already exsts");
    }
  };
  return (
    <Container onClick={() => createChat(id)}>
      <UserAvatar src={photoURL} />
      <p>{displayName}</p>
    </Container>
  );
}

export default Friend;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
  &&& {
    background-color: #ece5dd;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
