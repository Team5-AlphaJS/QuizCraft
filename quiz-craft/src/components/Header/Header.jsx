import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import {
  Avatar,
  Chip,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button as NextUIButton,
} from '@nextui-org/react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as NextUILink,
} from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { Input } from '../ui/input';
import { ModeToggle } from '../mode-toggle';
import { useToast } from '../ui/use-toast';
import { useContext, useState } from 'react';
import { AuthContext } from '/context/AuthContext';
import { logoutUser } from '/services/auth.service';
import { useDisclosure } from '@nextui-org/react';
import { LoginForm } from '../Authentication/LoginForm';
import { Settings, User } from 'lucide-react';

export default function Header() {
  const { user, userData, setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  const menuItems = [
    'Profile',
    'Dashboard',
    'Activity',
    'System',
    'My Settings',
    'Team Settings',
    'Help & Feedback',
    'Log Out',
  ];

  const logout = async () => {
    await logoutUser();
    setContext({ user: null, userData: null });

    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out.',
    });

    navigate('/');
  };

  return (
    <>
      <Navbar
        shouldHideOnScroll
        onMenuOpenChange={setIsMenuOpen}
        className={'bg-slate-900'}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Open Menu' : 'Close Menu'}
        />
        <NavbarBrand>
          <Link to="/" className="px-8 cursor-pointer text-primary">
            <b>QuizCraft</b>
          </Link>
        </NavbarBrand>

        <NavbarContent className="flex" justify="center">
          <NavbarItem>
            <NextUIButton color="success">Random free quiz</NextUIButton>
          </NavbarItem>
          <NavbarItem>
            <Input placeholder="Search quizzes" />
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="ml-8">
            {user ? (
              <div className="flex gap-4 items-center">
                {userData && `Welcome, ${userData.username}`}
                <div className="flex gap-1 items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Avatar
                        name={userData?.username.slice(0, 1)}
                        src={userData?.photo}
                        className="cursor-pointer"
                      />
                    </DropdownTrigger>
                    <DropdownMenu>
                      <DropdownItem
                        startContent={<User className={iconClasses} />}
                        onClick={() => navigate(`/user/${user?.uid}`)}
                      >
                        User Profile
                      </DropdownItem>
                      <DropdownItem
                        startContent={<Settings className={iconClasses} />}
                      >
                        User Settings
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                  <Chip size="sm">{userData?.role}</Chip>
                </div>
                <NextUIButton onClick={logout} color="success">
                  Logout
                </NextUIButton>
              </div>
            ) : (
              <>
                <NextUIButton
                  onPress={onOpen}
                  color="success"
                  className="px-8 mr-2"
                >
                  {' '}
                  Log In
                </NextUIButton>

                <LoginForm
                  isOpen={isOpen}
                  onOpenChange={onOpenChange}
                  onClose={onClose}
                />

                <Button asChild>
                  <Link to="/register" className="px-8">
                    Register
                  </Link>
                </Button>
              </>
            )}
          </NavbarItem>
          <NavbarItem className="ml-10">
            <ModeToggle />
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {userData && userData.role === 'admin' && (
            <NextUILink size="lg" className="font-medium">
              <Link to="/admin">Admin Dashboard</Link>
            </NextUILink>
          )}
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextUILink
                color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
                href="#"
                size="lg"
              >
                {item}
              </NextUILink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
}
