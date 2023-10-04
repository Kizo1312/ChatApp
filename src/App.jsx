import "./App.css";
import { useState } from "react";

function App() {
  const [users, setUsers] = useState([
    {
      name: "Toma",
      password: "toma123",
    },
    {
      name: "Kizo",
      password: "kizo123",
    },
  ]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [recipient, setRecipient] = useState(null);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input && currentUser && recipient) {
      setMessages([
        ...messages,
        { sender: currentUser.name, recipient: recipient, content: input },
      ]);
      setInput("");
    } else {
      alert("Please select a user and recepient and write a message");
    }
  };

  const addNewUser = (event) => {
    event.preventDefault();
    if (newName && newPassword) {
      setUsers([...users, { name: newName, password: newPassword }]);

      setNewName("");
      setNewPassword("");
    }
  };

  const selectUser = (user) => {
    setCurrentUser(user);

    // Postavljam automatski primatelja jer nezz zakaj bez toga nece radit dok su samo dva
    const otherUsers = users.filter((u) => u.name !== user.name);
    if (otherUsers.length === 1) {
      setRecipient(otherUsers[0].name);
    } else {
      setRecipient(null);
    }
  };
  return (
    <>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <p>{user.name}</p>
            <button onClick={() => selectUser(user)}>Send a message</button>
          </div>
        ))}
      </div>
      <form onSubmit={addNewUser}>
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
        <button type="submit">Add user</button>
      </form>

      <div>
        {currentUser && ( //zapamti kaj su truthy i falsy values, kad je currentUser truthy znaci da je selected
          <div>
            <p>Logged in as: {currentUser.name}</p>
            <select onChange={(event) => setRecipient(event.target.value)}>
              {users
                .filter((user) => user.name !== currentUser.name)
                .map((user) => (
                  <option key={user.name} value={user.name}>
                    {user.name}
                  </option>
                ))}
            </select>
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
                  {message.sender} to {message.recipient} : {message.content}
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
