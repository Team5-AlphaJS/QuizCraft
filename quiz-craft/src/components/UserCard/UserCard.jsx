import PropTypes from "prop-types";

const UserCard = ({ user }) => {
    return (
        <div className="flex h-32 my-2">
            <div className="user-photo w-1/4 border-r-2">
                <image className="ms-3" />
            </div>
            <div className="user-info flex flex-col flex-start space-y-0 w-3/4 ">
                <h3 className="ms-3 text-left text-2xl">{user.username}</h3>
                {(user.firstName || user.lastName) && <p className="ms-3 text-left text-sm">{user.firstName} {user.lastName}</p>}
                <p className="ms-3 text-left text-sm">{user.role}</p>
                <p className="ms-3 text-left text-sm">{user.email}</p>
                <p className=" ms-3 text-left text-sm">Member since: {new Date(user.createdOn).toLocaleString()}</p>
            </div>
        </div>
    )
};

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
