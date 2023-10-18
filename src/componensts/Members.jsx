import PropTypes from "prop-types";

function Members({ members, me }) {
  return (
    <div>
      <div>
        {members.length} user{members.length === 1 ? "" : "s"} online
      </div>
      <div>
        {members.map((member) => (
          <div key={member.id}>
            {member.username}
            {member.id === me.id ? " (you)" : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

Members.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
  me: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Members;
