import { push, ref, get, query, orderByChild, equalTo, update,} from 'firebase/database';
import { db } from '/config/firebase-config';

export const createGroup = (groupData) => {
  return push(ref(db, `groups/`), {
    ...groupData
  });
};

export const inviteEducator = (username, invitation, groupId) => {
  return update(ref(db, `users/${username}/groupInvitations/${groupId}`), invitation);
};

export const getGroupsByOwner = async (ownerId) => {
  return get(query(ref(db, 'groups'), orderByChild('ownerId'), equalTo(ownerId)));
};

export const getGroupsByParticipant = async (educatorUsername) => {
  try {
    // Query the groups where the educator is included as a participant
    const groupsSnapshot = await get(query(ref(db, 'groups'), orderByChild('participants/' + educatorUsername), equalTo(true)));

    if (groupsSnapshot.exists()) {
      // Extract the groups data from the snapshot
      const groupsData = groupsSnapshot.val();
      
      // Convert the object of groups to an array of groups
      const groupsArray = Object.keys(groupsData).map(groupId => ({
        id: groupId,
        ...groupsData[groupId]
      }));
      
      return groupsArray;
    } else {
      // Return an empty array if no groups are found
      return [];
    }
  } catch (error) {
    // Handle any errors
    console.error('Error fetching groups:', error);
    throw error; // Rethrow the error for the caller to handle
  }
};