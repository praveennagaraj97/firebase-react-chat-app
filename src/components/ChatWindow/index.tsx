import { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import firebase from "firebase/app";

import { firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import "./chat.css";

export default function ChatWindow({ user = { uid: "" } }) {
  const [text, setText] = useState("");
  const [vendor, setvendor] = useState("");
  const messagesRef = firestore.collection("messages");
  let query = messagesRef.where("connectbtw", "==", `${user.uid}&${vendor}`);
  query = messagesRef.orderBy("createdAt");

  const [messages] = useCollectionData(query, { idField: "id" }) as any;

  useEffect(() => {
    if (vendor === user.uid) {
      alert("you are not allowed send message to yourself.");
    }
  }, [vendor, user.uid]);

  const sendMessage = async () => {
    if (vendor === user.uid) {
      alert("you are not allowed send message to yourself.");
      return;
    }

    const message: Message = {
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      connectbtw: `${user.uid}&${vendor}`,
      from: user.uid,
      to: vendor,
    };

    await messagesRef.add(message);

    setText("");
  };

  return (
    <Jumbotron className="chat-window">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <p>my-id :- {user.uid}</p>
        <input
          value={vendor}
          onChange={(e) => setvendor(e.target.value)}
          required
        />
        <div className="display-window">
          {messages &&
            messages.map((each: any, i: number) => {
              if (each.from === user.uid) {
                return (
                  <div className="sent" key={i}>
                    {each.text}
                  </div>
                );
              } else {
                return (
                  <div className="recieved" key={i}>
                    {each.text}
                  </div>
                );
              }
            })}
        </div>
        <div className="msg-in-and-send">
          <input
            onChange={(e) => {
              setText(e.target.value);
            }}
            required
            value={text}
            type="text"
            placeholder="Enter message"
          />
          <button type="submit">send</button>
        </div>
      </form>
    </Jumbotron>
  );
}

interface Message {
  text: string;
  createdAt: any;
  connectbtw: string;
  from: string;
  to: string;
}
