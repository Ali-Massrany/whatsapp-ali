import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Head from "next/head";
import styled from "styled-components";
import SideBar from "../../components/SideBar";
import ChatScreen from "../../components/ChatScreen";

const ChatBox = ({ chat, id }) => {
  return (
    <Container>
      <Head>
        <title>Chat</title>
      </Head>
      {/* <SideBar /> */}
      <ChatContainer>
        <ChatScreen chat={chat} chat_id={id} />
      </ChatContainer>
    </Container>
  );
};
export default ChatBox;
export async function getServerSideProps(context) {
  const docRef = doc(db, "chats", context.query.id);
  const docSnap = await getDoc(docRef);
  return {
    props: {
      chat: JSON.stringify(docSnap.data()),
      id: context.query.id,
    },
  };
}
const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
