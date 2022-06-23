import styled from "styled-components";
import React from "react";
import { Avatar } from "@material-ui/core";
import { useEffect, useState } from "react";
import getFriendData from "../utils/getFriendData";
import { useRouter } from "next/router";
function Chat({ id, users, name, timestamp = "", latestMeassage = "" }) {
  const [friend, setFriend] = useState({});
  const router = useRouter();
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  useEffect(() => {
    if (users.length > 0) {
      getFriendData(users).then((data) => {
        setFriend(data);
      });
    }
  });
  return (
    <Container onClick={enterChat}>
      <UserAvatar src={friend.photoURL} />
      <p>{friend.displayName}</p>
    </Container>
  );
}

export default Chat;
const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
`;
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
