import "./App.css";
import { useState, useEffect, useRef } from "react";
// import Members from "./componensts/Members";
import Messages from "./componensts/Messages";
import Input from "./componensts/Input";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
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

  const sendMessage = (message) => {
    if (currentUser && droneRef.current) {
      if (message) {
        droneRef.current.publish({
          room: "observable-room",
          message,
        });
      } else {
        alert("Please enter a message");
      }
    } else {
      alert("Please select a user");
    }
  };

  const updateUsername = (newName) => {
    if (newName) {
      setUsers([...users, { id: newName, name: newName }]);
      if (currentUser) {
        setCurrentUser({ ...currentUser, name: newName });
      }
    } else {
      alert("Please enter a username");
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUsername(e.target.username.value);
          e.target.username.value = ""; // Clear the input
        }}
      >
        <input type="text" placeholder="Choose a username" name="username" />
        <button type="submit">Update Username</button>
      </form>

      {currentUser && (
        <div>
          <p>Logged in as: {currentUser.name}</p>
          <Input onSendMessage={sendMessage} senderName={currentUser.name} />
          <Messages messages={messages} me={currentUser} />
        </div>
      )}
    </div>
  );
}

export default App;
