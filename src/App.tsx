import { useAuthState } from "react-firebase-hooks/auth";
import { Spinner } from "react-bootstrap";
import firebase, { firebaseAuth } from "./firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import Header from "./components/Header";
import Login from "./components/Login";
import ChatWindow from "./components/ChatWindow";

function App() {
  const [user, loading] = useAuthState(firebase.auth());

  // console.log(loading, user, error);

  async function handleLogout(): Promise<any> {
    await firebaseAuth.signOut();
  }

  function ComponentBody() {
    if (loading) {
      return (
        <Spinner
          className="spinner-contanier"
          animation="grow"
          variant="info"
        />
      );
    }
    if (!user) {
      return <Login />;
    }

    return <ChatWindow user={user} />;
  }

  return (
    <div className="App">
      <Header user={user} handleLogout={handleLogout} />
      <ComponentBody />
    </div>
  );
}

export default App;
