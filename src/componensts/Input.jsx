import { useState } from "react";
import PropTypes from "prop-types";

function Input({ onSendMessage }) {
  const [text, setText] = useState("");

  function onChange(e) {
    const newText = e.target.value;
    setText(newText);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (text.trim() !== "") {
      onSendMessage(text);
      setText("");
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={onChange}
          placeholder="Enter your message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

Input.propTypes = {
  onSendMessage: PropTypes.func.isRequired,
};

export default Input;
