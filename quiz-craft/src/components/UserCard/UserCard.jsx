import { Avatar } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
    const navigate = useNavigate();

    return (
        <div className="flex h-32 my-2">
            <div className="user-photo w-1/4 border-r-2">
                <Avatar
                    name={user?.username.slice(0, 1)}
                    src={user?.photo}
                    className="cursor-pointer ms-14 mt-6 w-20 h-20 text-large"
                    onClick={() => navigate(`/user/${user?.uid}`)}
                />
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

