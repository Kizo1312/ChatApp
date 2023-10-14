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
  });

  const droneRef = useRef(null);

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
  }

  useEffect(() => {
    connectToScaledrone();
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (input && currentUser && droneRef.current) {
      const message = { sender: currentUser.id, content: input };
      droneRef.current.publish({
        room: "observable-room",
        message: message,
      });
      setMessages([...messages, message]);
      setInput("");
    } else {
      alert("Please select a user and write a message");
    }
  };

  const addUser = (event) => {
    event.preventDefault();
    if (newName) {
      setUsers([...users, { id: newName, name: newName }]);
      setNewName("");
      if (!currentUser) {
        setCurrentUser({ id: newName, name: newName });
      }
    }
  };

  return (
    <>
      <div>
        {users.map((user) => (
          <div key={user.id}>
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
        <button type="submit">Login</button>
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
    </>
  );
}

export default App;
