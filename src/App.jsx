import "./App.css";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input && currentUser) {
      setMessages([...messages, { sender: currentUser.name, content: input }]);
      setInput("");
    } else {
      alert("Please select a user and write a message");
    }
  };

  const addUser = (event) => {
    event.preventDefault();
    if (newName && newPassword) {
      const newUser = { name: newName, password: newPassword };
      setUsers([...users, newUser]);
      setNewName("");
      setNewPassword("");

      setCurrentUser(newUser);
    }
  };

  return (
    <>
      <div>
        {users.map((user, index) => (
          <div key={index} onClick={() => setCurrentUser(user)}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>
      <form onSubmit={addUser}>
        <input
          type="text"
          placeholder="Name"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <input
          type="password"
          placeholder="enter password"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <div>
        {currentUser && (
          <div>
            <p>Logged in as: {currentUser.name}</p>
            <form onSubmit={sendMessage}>
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Send a message"
              />
              <button type="submit">Submit</button>
            </form>
            <div>
              {messages.map((message, index) => (
                <p key={index}>
                  {message.sender}: {message.content}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
