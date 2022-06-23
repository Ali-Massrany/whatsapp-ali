import styled from "styled-components";
import React from "react";
import { useAuth } from "../Auth";
import moment from "moment";
function Message({ user, message, timestamp }) {
  const { currentUser } = useAuth();
  const loginMail = "ckmobile@gmail.com";
  const MessageType = user === currentUser.email ? MyMessage : FrdMessage;
  return (
    <Container>
      {/* {(user !== currentUser.email && <MessageTail>

        </MessageTail>)} */}
      <MessageType>
        <div>{message}</div>
        <Timestamp>{moment(timestamp).format("LT")}</Timestamp>
      </MessageType>
    </Container>
  );
}

export default Message;
const Container = styled.div`
  display: flex;
`;
const MessageBubble = styled.div`
  padding: 15px;
  padding-bottom: 26px;
  text-align: right;
  background-color: white;
  margin-bottom: 10px;
  position: relative;
`;
const MyMessage = styled(MessageBubble)`
  margin-left: auto;
  background-color: #dcf8c6;
  clip-path: polygon(
    0% 0%,
    100% 0%,
    100% 75%,
    100% 76%,
    100% 100%,
    76% 76%,
    0% 75%
  );
  border-radius: 8px 0px 8px 8px;
  text-align: right;
  font-size: 14px;
`;
const FrdMessage = styled(MessageBubble)`
  background-color: white;
  text-align: left;
  border-radius: 0px 8px 8px 8px;
  font-size: 14px;
  clip-path: polygon(0% 0%, 100% 0%, 100% 75%, 30% 75%, 0 100%, 0 75%, 0 74%);
`;
const Timestamp = styled.span`
  color: gray;
  margin-bottom: 16px;
  margin-right: 6px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
const MessageTail = styled.span`
  margin-top: -2px;
`;
