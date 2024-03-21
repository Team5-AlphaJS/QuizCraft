import { useState, useEffect, useContext } from 'react';
import { Button } from '@nextui-org/react'; // Assuming you're using Next UI for buttons
import { AuthContext } from '/context/AuthContext'; // Auth context for accessing current user data
import { inviteAcceptedGroup, removeGroupInvitation} from 'services/groups.service';

const GroupInvitation = ({ groupId }) => {
  const { userData } = useContext(AuthContext);
  const [invitation, setInvitation] = useState(null);

  useEffect(() => {
    // Find the invitation corresponding to the groupId in userData.groupInvitations
    const foundInvitation = userData.groupInvitations && userData.groupInvitations[groupId];
    setInvitation(foundInvitation);
  }, [groupId, userData.groupInvitations]);

  const handleAccept = () => {
    // Call the inviteAcceptedGroup function from AuthContext to accept the invitation
    inviteAcceptedGroup(groupId);
    removeGroupInvitation(groupId);
  };

  const handleReject = () => {
    // Call the rejectGroupInvitation function from AuthContext to reject the invitation
    removeGroupInvitation(groupId);
  };

  return (
    <div>
      {invitation && (
        <div>
          <h2>Invitation to join group: {groupId}</h2>
          <p>You have been invited to join this group.</p>
          <div className="space-x-5">
            <Button
              startContent="Accept"
              variant="ghost"
              color="primary"
              onClick={handleAccept}
            />
            <Button
              startContent="Reject"
              variant="ghost"
              color="danger"
              onClick={handleReject}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupInvitation;