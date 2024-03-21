import { useContext, useEffect, useState } from "react";
import { AuthContext } from "/context/AuthContext";
import { Button } from "../ui/button";
import { getGroupById } from "/services/groups.service";
import { removeFromGroupInvited, inviteAcceptedGroup } from "/services/groups.service";
import { acceptGroupInvitation } from "/services/users.service";
import { removeGroupInvitation } from "/services/users.service";

const ViewGroupInvites = () => {
  const { userData } = useContext(AuthContext);
  const [groupIds,  setGroupIds] = useState([]);

  useEffect(() => {
    if (userData && userData.groupInvitations) {
      const groupIdsArray = Object.keys(userData.groupInvitations);
      setGroupIds(groupIdsArray);
    }
  }, [userData]);

  const handleAcceptInvite = async (groupId) => {
    try {
      // Remove user from group invitations
      await removeFromGroupInvited(userData.username, groupId);
      // Add user to the group participants
      await inviteAcceptedGroup(groupId, userData.username);
      // Add group to user's groups list
      await acceptGroupInvitation(groupId, userData.username);
      // Retrieve group data
      await removeGroupInvitation(userData.username, groupId)
      const groupSnapshot = await getGroupById(groupId);
      const groupData = groupSnapshot.val();
      console.log("Accepted invitation to group:", groupData);
    } catch (error) {
      console.error("Error accepting group invitation:", error);
    }
  };

  const handleRejectInvite = async (groupId) => {
    try {
      // Remove user from group invitations
      await removeFromGroupInvited(userData.username, groupId);
      console.log("Rejected invitation to group with ID:", groupId);
      await removeGroupInvitation(userData.username, groupId)
    } catch (error) {
      console.error("Error rejecting group invitation:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Group Invitations</h2>
      {groupIds.length > 0 ? (
        <div>
          {groupIds.map((groupId, index) => (
            <div key={index} className="my-2 p-4">
              <p className="text-lg font-semibold">
                Group ID: {groupId}
              </p>
              {/* Accept and reject Buttons */}
              <div className="flex space-x-4">
                <Button onClick={() => handleAcceptInvite(groupId)} className="px-4 py-2 ">
                  Accept
                </Button>
                <Button onClick={() => handleRejectInvite(groupId)} className="px-4 py-2 ">
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No group invitations found.</p>
      )}
    </div>
  );
};

export default ViewGroupInvites;