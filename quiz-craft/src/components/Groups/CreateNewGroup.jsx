
import { useState, useContext } from 'react';
import { AuthContext } from '/context/AuthContext.jsx';
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Toaster } from "../ui/toaster";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useToast } from "../ui/use-toast";
import { createGroup } from '/services/groups.service.js';
import GroupInvite from '../GroupInvite/GroupInvite';
import { inviteEducator } from '/services/groups.service';

// Import additional components as needed

const CreateNewGroup = () => {
  const { userData } = useContext(AuthContext);
  const [group, setGroup] = useState({
    name: '',
    owner: userData.username,
    participants: userData.username,
    invited: {},
  });

  const { toast } = useToast();

  const onCreate = async () => {
    console.log(group);
    // Handle creation of new group
    // if (group.title.length < 3 || group.title.length > 30) {
    //   toast({
    //     title: "Invalid title",
    //     description: 'Title must be between 3 and 30 characters long!'
    //   });
    //   return;
    // }

    try {
      console.log("hi");  
      const response = await createGroup(group);
      const groupId = response._path.pieces_[1];
      console.log(groupId);
      const invitation = {
        status: "pending"
      };
      Object.keys(group.invited).map(async participant => await inviteEducator(participant, invitation, groupId));

    } catch (e) {
      toast({
        title: "Something went wrong",
        description: e.message
      });
    } finally {
      toast({
        title: 'Group created successfully'
      });

      setGroup({
        name: '',
        owner: userData.username,
        participants: userData.username,
        invited: {}
      });
    }

  };

  return (
    <Card className="h-[90%] w-5/6 p-3 flex flex-col border-3">
      <div className="flex justify-between">
        <Label className="mt-1.5 mr-1 pl-1 w-24" htmlFor="groupName">
          Group Name
        </Label>
        <Input
          className="w-full p-1"
          id="groupName"
          placeholder="Enter group name"
          value={group.name}
          onChange={(e) => setGroup({ ...group, name: e.target.value })}
        />
      </div>
      {/* Add more inputs for group properties */}
      <GroupInvite group={group} setGroup={setGroup} />{" "}
      <Button className="ml-1 w-1/6 h-8 self-end" onClick={onCreate}>
        Create Group
      </Button>
      <Toaster />
    </Card>
  );
};

export default CreateNewGroup;