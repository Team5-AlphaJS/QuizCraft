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
  return get(query(ref(db, 'groups'), orderByChild('owner'), equalTo(ownerId)));
};

export const getGroupById = async (groupId) => {
  return get(query(ref(db,'groups'), orderByChild('uid'), equalTo(groupId)));
}

export const inviteAcceptedGroup = (groupId, userName) => {
  return update(ref(db, `groups/${groupId}/participants/`), { [userName]: true });
};


export const removeFromGroupInvited = async (username, groupId) => {
  return update(ref(db, `group/${groupId}/invited/`), { [username]: null });
};

// export const getGroupsByParticipant = async (participantUsername) => {
//   try {
//     // Query the groups where the participant is included
//     const groupsSnapshot = await get(query(ref(db, 'groups'), orderByChild(`participants/${participantUsername}`), equalTo(true)));

//     if (groupsSnapshot.exists()) {
//       // Extract the groups data from the snapshot
//       const groupsData = groupsSnapshot.val();
      
//       // Convert the object of groups to an array of groups
//       const groupsArray = Object.keys(groupsData).map(groupId => ({
//         id: groupId,
//         ...groupsData[groupId]
//       }));
      
//       return groupsArray;
//     } else {
//       // Return an empty array if no groups are found
//       return [];
//     }
//   } catch (error) {
//     // Handle any errors
//     console.error('Error fetching groups:', error);
//     throw error; // Rethrow the error for the caller to handle
//   }
// };

export const getGroupsByParticipant = async (participantUsername) => {
  try {
    // Query all groups
    const groupsSnapshot = await get(query(ref(db, 'groups')));

    if (groupsSnapshot.exists()) {
      // Extract the groups data from the snapshot
      const groupsData = groupsSnapshot.val();
      
      // Filter groups based on participant's username
      const participantGroups = Object.keys(groupsData).filter(groupId =>
        groupsData[groupId].participants && groupsData[groupId].participants[participantUsername]
      ).map(groupId => ({
        id: groupId,
        ...groupsData[groupId]
      }));
      
      return participantGroups;
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