import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newName, setNewName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const meRef = useRef({
    id: null,
    name: "user",
  });

  const droneRef = useRef(null);
  const roomRef = useRef(null);

  function connectToScaledrone() {
    const drone = new window.Scaledrone("IbUarokoT6VdaC7h", {
      data: meRef.current,
    });

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      meRef.current.id = drone.clientId;
      setCurrentUser(meRef.current);
    });

    droneRef.current = drone;

    roomRef.current = drone.subscribe("observable-room");

    roomRef.current.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }

  useEffect(() => {
    connectToScaledrone();
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input && currentUser && droneRef.current) {
      const message = { sender: currentUser.name, content: input };
      droneRef.current.publish({
        room: "observable-room",
        message: message,
      });
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput("");
    } else {
      alert("Please select a user and write a message");
    }
  };

  const updateUsername = (event) => {
    event.preventDefault();
    if (newName) {
      setUsers([...users, { id: newName, name: newName }]);
      setNewName("");
      if (currentUser) {
        setCurrentUser({ ...currentUser, name: newName });
      }
    }
  };

  return (
    <div className="container">
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name}</p>
          </div>
        ))}
      </div>

      <form onSubmit={updateUsername}>
        <input
          type="text"
          placeholder="Choose a username"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <button type="submit">Update Username</button>
      </form>

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
  );
}

export default App;
