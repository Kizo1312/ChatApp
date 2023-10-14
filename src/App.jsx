import { useState, useEffect, useRef } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [newName, setNewName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const droneRef = useRef(null);

  function connectToScaledrone() {
    const drone = new window.Scaledrone("IbUarokoT6VdaC7h");

    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }

      const randomUsername = "user" + Math.floor(Math.random() * 1000);
      setCurrentUser({ name: randomUsername });
    });

    droneRef.current = drone;
  }

  useEffect(() => {
    connectToScaledrone();
  }, []);

  const onSendMessage = (message) => {
    if (droneRef.current) {
      droneRef.current.publish({
        room: "observable-room",
        message: {
          text: message,
          sender: currentUser.name,
        },
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: currentUser.name },
      ]);
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

      <form onSubmit={(event) => event.preventDefault()}>
        <input
          type="text"
          placeholder="Choose a username"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <button
          type="button"
          onClick={() => {
            if (newName) {
              setUsers([...users, { id: newName, name: newName }]);
              setNewName("");
              setCurrentUser({ name: newName });
            }
          }}
        >
          Update Username
        </button>
      </form>

      {currentUser && (
        <div>
          <p>Logged in as: {currentUser.name}</p>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (input) {
                onSendMessage(input);
                setInput("");
              }
            }}
          >
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
                {message.sender}: {message.text}
              </p>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
