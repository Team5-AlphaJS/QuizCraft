import { useEffect, useState, useContext } from 'react';
import { getGroupsByOwner } from '/services/groups.service.js'; // Import the function to fetch groups
import { Card } from "../ui/card";
import { AuthContext } from '/context/AuthContext.jsx';


const MyGroups = () => {
  const { userData } = useContext(AuthContext);

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const ownerId = userData.username;
        const snapshot = await getGroupsByOwner(ownerId);
        const groupsData = snapshot.val();
        if (groupsData) {
          // Convert object to array of groups
          const groupsArray = Object.values(groupsData);
          setGroups(groupsArray);
        } else {
          setGroups([]); // If no groups found, set an empty array
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    if(userData){
      fetchGroups();
    }
  }, [userData]);


  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">My Groups</h2>
      {userData && groups.length > 0 ? (
        <div>
          {groups.map((group) => (
            <Card key={group.name} className="my-2 p-4">
              <h3 className="text-lg font-semibold">{group.name}</h3>
              {/* Display other group details */}
            </Card>
          ))}
        </div>
      ) : (
        <p>No groups found.</p>
      )}
    </div>
  );
};

export default MyGroups;