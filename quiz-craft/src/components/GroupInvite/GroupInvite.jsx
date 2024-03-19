import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/users.service";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

const GroupInvite = ({ group, setGroup }) => {
  const [educators, setEducators] = useState([]);
  const [origEducators, setOrigEducators] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getAllUsers()
      .then(snapshot => {
        const users = Object.entries(snapshot.val());
        setEducators([...users.filter(user => user[1].role === 'Educator')]);
        setOrigEducators([...users.filter(user => user[1].role === 'Educator')]);
      });
  }, [])
   
  useEffect(() => {
    setEducators([...origEducators.filter(educator => educator[1].username.toLowerCase().startsWith(searchTerm.toLowerCase()))]);
}, [searchTerm]);

  const onInvite = (educator) => {
    
    if (educator in group.invited) {
      delete group.invited[educator];
      setGroup({ ...group });
    } else {
      group.invited[educator] = true;
      setGroup({ ...group });
    }
  };

  
  return (
    <div>
      <Input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Educator username" />
      <ScrollArea>
        <div className="p-10">
          {educators.map(educator => (
            <div key={educator[0]} id={educator[0]} className="flex justify-between border-b">
              <p className=" px-5">{educator[0]}</p>
              <a href="" onClick={(e) => {
                e.preventDefault();
                onInvite(e.target.parentNode.id);
              }}>
                {educator[0] in group.invited ? 'Uninvite' : 'Invite'}
              </a>

            </div>
          ))}

        </div>
      </ScrollArea>
    </div>
  )
}

GroupInvite.propTypes = {
  group: PropTypes.object.isRequired,
  setGroup: PropTypes.func.isRequired
};

export default GroupInvite