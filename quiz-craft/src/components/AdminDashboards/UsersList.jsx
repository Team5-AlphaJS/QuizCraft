import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/users.service';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, Link } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { Button, Accordion, AccordionItem } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { handleToggleRole } from '../../../services/users.service';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [origUsers, setOrigUsers] = useState([]);

  // search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('username');

  // sorting stats
  const [desc, setDesc] = useState(false);
  const [sortBy, setSortBy] = useState('username');

  const navigate = useNavigate();

  const sortUsers = (usersGiven) => {
    return desc
      ? sortBy === 'createdOn'
        ? usersGiven.sort((userA, userB) => userB[sortBy] - userA[sortBy])
        : usersGiven.sort((userA, userB) =>
            userB[sortBy]
              .toLowerCase()
              .localeCompare(userA[sortBy].toLowerCase())
          )
      : sortBy === 'createdOn'
      ? usersGiven.sort((userA, userB) => userA[sortBy] - userB[sortBy])
      : usersGiven.sort((userA, userB) =>
          userA[sortBy].toLowerCase().localeCompare(userB[sortBy].toLowerCase())
        );
  };

  // setting the users in the state
  useEffect(() => {
    getAllUsers().then((snapshot) => {
      const sortedUsers = sortUsers(Object.values(snapshot.val()));
      setUsers([...sortedUsers]);
      setOrigUsers([...sortedUsers]);
    });
  }, []);

  // sorting users
  useEffect(() => {
    setUsers([...sortUsers(users)]);
  }, [sortBy, desc]);

  // filter users by searchTerm
  useEffect(() => {
    setUsers([
      ...origUsers.filter((user) => user[searchBy].startsWith(searchTerm)),
    ]);
  }, [searchTerm]);

  const handleToggleStudent = async (userUsername, currentRole) => {
    const newRole = currentRole === 'Student' ? 'Blocked' : 'Student';
    await handleToggleRole(userUsername, newRole);
    setUsers(
      users.map((user) =>
        user.username === userUsername ? { ...user, role: newRole } : user
      )
    );
  };

  const handleToggleEducator = async (userUsername, currentRole) => {
    const newRole = currentRole === 'Educator' ? 'Blocked' : 'Educator';
    await handleToggleRole(userUsername, newRole);
    setUsers(
      users.map((user) =>
        user.username === userUsername ? { ...user, role: newRole } : user
      )
    );
  };

  return (
    <>
      <div className="flex flex-row w-full mb-2">
        {/* maybe it should be onSubmit? so that the search button a purpose */}
        <Input
          type="text"
          placeholder="search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          color="primary"
          variant="ghost"
          className="ml-2"
          startContent={<Search />}
        >
          Search
        </Button>
      </div>
      <div className="flex mt-0.5 mb-10 h-[440px]">
        <ScrollArea className="list-of-users w-2/3 border-r-4 h-full">
          <div className="p-4">
            {users.length > 0 ? (
              <p className="text-xl font-semibold text-center">
                Total number of users:{' '}
                {users.filter((user) => user.role !== 'admin').length}{' '}
              </p>
            ) : (
              <p className="text-xl font-semibold text-center">
                No users found.
              </p>
            )}

            {users &&
              users.map(
                (user) =>
                  user.role !== 'admin' && (
                    <div key={user.id} className="flex h-32 my-2">
                      <div className="user-photo w-1/4 border-r-2">
                        <Avatar
                          name={user?.username.slice(0, 1)}
                          src={user?.photo}
                          className="cursor-pointer ms-14 mt-6 w-20 h-20 text-large"
                          onClick={() => navigate(`/user/${user?.uid}`)}
                        />
                      </div>
                      <div className="user-info flex flex-col flex-start space-y-0 w-3/4 ">
                        <h3 className="ms-3 text-left text-2xl">
                          {user.username}
                        </h3>
                        {(user.firstName || user.lastName) && (
                          <p className="ms-3 text-left text-sm">
                            {user.firstName} {user.lastName}
                          </p>
                        )}
                        <p className="ms-3 text-left text-sm">{user.role}</p>
                        <p className="ms-3 text-left text-sm">{user.email}</p>
                        <p className=" ms-3 text-left text-sm">
                          Member since:{' '}
                          {new Date(user.createdOn).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          color="danger"
                          onClick={() =>
                            user.email.includes('edu.mon.bg')
                              ? handleToggleEducator(user?.username, user?.role)
                              : handleToggleStudent(user?.username, user?.role)
                          }
                        >
                          {user.role === 'Student' || user.role === 'Educator'
                            ? 'Block'
                            : 'Unblock'}
                        </Button>
                      </div>
                    </div>
                  )
              )}
          </div>
        </ScrollArea>

        <div className="search-options ml-3">
          <Accordion
            variant="bordered"
            className="w-[415px]"
            selectionMode="multiple"
          >
            <AccordionItem title="Search by">
              <RadioGroup defaultValue="username" className="mb-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="username"
                    id="search-username"
                    onClick={() => setSearchBy('username')}
                  />
                  <Label htmlFor="search-username">Username</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="first-name"
                    id="search-firstname"
                    onClick={() => setSearchBy('firstName')}
                  />
                  <Label htmlFor="search-firstname">First name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="last-name"
                    id="search-lastname"
                    onClick={() => setSearchBy('lastName')}
                  />
                  <Label htmlFor="search-lastname">Last name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="email"
                    id="search-email"
                    onClick={() => setSearchBy('email')}
                  />
                  <Label htmlFor="search-email">Email</Label>
                </div>
              </RadioGroup>
            </AccordionItem>

            <AccordionItem title="Sort by">
              <div className="flex flex-row">
                <p className="text-l">Sort order:</p>
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setDesc(!desc);
                  }}
                  className="ml-2"
                >
                  {!desc ? 'Desc' : 'Asc'}
                </Link>
              </div>
              <RadioGroup defaultValue="username" className="mb-3">
                <div className="flex items-center space-x-2 mt-2">
                  <RadioGroupItem
                    value="username"
                    id="sort-username"
                    onClick={() => setSortBy('username')}
                  />
                  <Label htmlFor="sort-username">Username</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="first-name"
                    id="sort-firstname"
                    onClick={() => setSortBy('firstName')}
                  />
                  <Label htmlFor="sort-firstname">First name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="last-name"
                    id="sort-lastname"
                    onClick={() => setSortBy('lastName')}
                  />
                  <Label htmlFor="sort-lastname">Last name</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="email"
                    id="sort-email"
                    onClick={() => setSortBy('email')}
                  />
                  <Label htmlFor="sort-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="member-since"
                    id="sort-member-since"
                    onClick={() => setSortBy('createdOn')}
                  />
                  <Label htmlFor="sort-member-since">Member since</Label>
                </div>
              </RadioGroup>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default UsersList;
