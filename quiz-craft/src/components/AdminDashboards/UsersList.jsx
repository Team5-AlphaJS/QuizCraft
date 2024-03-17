import { useEffect, useState } from 'react';
import { getAllUsers } from '../../../services/users.service';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import UserCard from '../UserCard/UserCard';
import { Link } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { Button, Accordion, AccordionItem } from '@nextui-org/react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [origUsers, setOrigUsers] = useState([]);

  // search states
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('username');

  // sorting stats
  const [desc, setDesc] = useState(false);
  const [sortBy, setSortBy] = useState('username');

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
                Total number of users: {users.length}{' '}
              </p>
            ) : (
              <p className="text-xl font-semibold text-center">
                No users found.
              </p>
            )}
            {users &&
              users.map((user) => <UserCard key={user.uid} user={user} />)}
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
              <RadioGroup defaultValue="username">
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
