import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '/context/AuthContext'; // Import the AuthContext
import { getGroupsByParticipant } from '/services/groups.service'; // Import the function to fetch groups
import { Card } from "../ui/card";

const AllGroups = () => {
  const { userData } = useContext(AuthContext); // Access userData from AuthContext
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    if (userData) {
      const fetchGroups = async () => {
        try {
          const fetchedGroups = await getGroupsByParticipant(userData.username); // Use userData.username
          setGroups(fetchedGroups);
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      };
    
      fetchGroups();
    }
  }, [userData]); // Trigger effect when userData changes

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Groups including {userData && userData.username}</h2>
      {groups.length > 0 ? (
        <div>
          {groups.map((group) => (
            <Card key={group.id} className="my-2 p-4">
              <h3 className="text-lg font-semibold">{group.name}</h3>
              {/* Display other group details */}
            </Card>
          ))}
        </div>
      ) : (
        <p>No groups found for {userData && userData.username}.</p>
      )}
    </div>
  );
};

export default AllGroups;