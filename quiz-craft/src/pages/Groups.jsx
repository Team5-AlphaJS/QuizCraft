import { useState } from 'react';
import { Button } from '@nextui-org/react';
import MyGroups from '@/components/Groups/MyGroups';
import AllGroups from '@/components/Groups/AllGroups';
import CreateNewGroup from '@/components/Groups/CreateNewGroup';
import ViewInvites from '@/components/GroupInvite/ViewInvites';

const Groups = () => {

  const [showMyGroups, setShowMyGroups] = useState(true);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [showCreateNewGroup, setShowCreateNewGroup] = useState(false);
  const [showViewInvites, setShowViewInvite] = useState(false);

  const handleMyGroupsClick = () => {

    setShowMyGroups(true);
    setShowAllGroups(false);
    setShowCreateNewGroup(false);
    setShowViewInvite(false);
  };

  const handleAllGroupsClick = () => {
    setShowMyGroups(false);
    setShowAllGroups(true);
    setShowCreateNewGroup(false);
    setShowViewInvite(false);
  };

  const handleCreateNewGroupClick = () => {
    setShowMyGroups(false);
    setShowAllGroups(false);
    setShowCreateNewGroup(true);
    setShowViewInvite(false);
  };
  
  const handleInvitesClick = () => {
    setShowMyGroups(false);
    setShowAllGroups(false);
    setShowCreateNewGroup(false);
    setShowViewInvite(true);
  }
  return (
    <div className="flex h-screen justify-around">
      {/* Left menu */}
      <div className="w-1/6  h-1/3 flex flex-col p-4 justify-evenly ">
            <Button ghost onClick={handleMyGroupsClick} block>
              My Groups
            </Button>
            <Button ghost onClick={handleAllGroupsClick} block>
              All Groups
            </Button>
            <Button ghost onClick={handleCreateNewGroupClick} block>
              Create New Group
            </Button>
            <Button ghost onClick={handleInvitesClick} block>
              Invites
            </Button>
      </div>

      {/* Right content area */}
      <div className="w-5/6 h-screen p-4 flex justify-center">
        {/* Render different content based on selected menu */}
        {showMyGroups && <MyGroups />}
        {showAllGroups && <AllGroups />}
        {showCreateNewGroup && <CreateNewGroup />}    
        {showViewInvites && <ViewInvites />} 
        {/* Default content */}
      </div>
    </div>
  );
};

export default Groups;