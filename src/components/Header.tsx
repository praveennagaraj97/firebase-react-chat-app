import { Button } from "react-bootstrap";
import "./header.css";

export default function Header({ user = null, handleLogout = () => {} }) {
  return (
    <header className="header">
      <h1>
        Chat App <small>(customer app)</small>
      </h1>

      {user && <Button onClick={handleLogout}>Logout</Button>}
    </header>
  );
}
