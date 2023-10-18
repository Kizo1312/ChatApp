import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

function Messages({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <ul>
      {messages.map((message, index) => (
        <li key={index}>
          <strong>{message.member.username}:</strong> {message.data}
        </li>
      ))}
      <div ref={bottomRef}></div>
    </ul>
  );
}

Messages.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      data: PropTypes.shape,

      member: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};

export default Messages;
