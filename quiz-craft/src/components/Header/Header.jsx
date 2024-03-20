import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '../ui/button';
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
  // NavbarContent,
  // NavbarItem,
  Link as NextUILink,
} from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
// import { Input } from '../ui/input';
import { ModeToggle } from '../mode-toggle';
import { useToast } from '../ui/use-toast';
import { useContext, useState } from 'react';
import { AuthContext } from '/context/AuthContext';
import { logoutUser } from '/services/auth.service';
import { useDisclosure } from '@nextui-org/react';
import { LoginForm } from '../Authentication/LoginForm';
import { User, X } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.svg';

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
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Navbar
        className={'bg-slate-900'}
        shouldHideOnScroll
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Open Menu' : 'Close Menu'}
          className='text-white'
        />
        <NavbarBrand>
          <img width={'55px'} src={logo} />
          {user === null ? (
            <Link
              to="/"
              className="ml-[-3px] cursor-pointer text-primary text-xl font-semibold"
            >
              Quizzify
            </Link>
          ) : (
            <Link
              to="/home"
              className="ml-[-3px] cursor-pointer text-primary text-xl font-semibold"
            >
              Quizzify
            </Link>
          )}
        </NavbarBrand>

        {/* <NavbarContent className="flex" justify="center">
        <NavbarItem>
          <NextUIButton color="primary">Random free quiz</NextUIButton>
        </NavbarItem>
        <NavbarItem>
          <Input placeholder="Search quizzes" />
        </NavbarItem>
      </NavbarContent> */}

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
                    startContent={<X className={iconClasses} />}
                    onClick={logout}
                    color="danger"
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Chip size="sm" className="ml-1">
                {userData?.role}
              </Chip>
            </div>
          </div>
        ) : (
          <>
            <motion.div whileHover={{ scale: 1.1 }}>
              <NextUIButton
                onPress={onOpen}
                color="primary"
                className="px-8 mr-2"
              >
                {' '}
                Log In
              </NextUIButton>
            </motion.div>

            <LoginForm
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onClose={onClose}
            />

            <motion.div whileHover={{ scale: 1.1 }}>
              <NextUIButton
                color="primary"
                className="px-8 mr-2"
                onClick={() => navigate('/register')}
              >
                Register
              </NextUIButton>
            </motion.div>
          </>
        )}

        <ModeToggle />

        <NavbarMenu>
          {userData && userData.role === 'admin' && (
            <NextUILink size="lg" className="font-medium">
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                Admin Dashboard
              </Link>
            </NextUILink>
          )}
          {/* {userData && userData.role === 'Educator' && (
            <NextUILink size="lg" className="font-medium">
              <Link
                to="/educator-dashboard"
                onClick={() => setIsMenuOpen(false)}
              >
                Educator Dashboard
              </Link>
            </NextUILink>
          )} */}
          {userData && userData.role === 'Educator' && (
            <NextUILink size="lg" className="font-medium">
              <Link
                to="/create-quiz"
                onClick={() => setIsMenuOpen(false)}
              >
                Create quiz
              </Link>
            </NextUILink>
          )}
          {userData && userData.role === "Student" && (
            <NextUILink size="lg" className="font-medium">
              <Link
                to="/quizzes"
                onClick={() => setIsMenuOpen(false)}
              >
                Quizzes
              </Link>
            </NextUILink>
          )}
          <NextUILink size="lg" className="font-medium">
            <Link
              to="/active"
              onClick={() => setIsMenuOpen(false)}
            >
              Active Quizzes
            </Link>
          </NextUILink>
          <NextUILink size="lg" className="font-medium">
              <Link
                to="/participatingIn"
                onClick={() => setIsMenuOpen(false)}
              >
                Participating In
              </Link>
            </NextUILink>
          {/* {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextUILink
                color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
                href="#"
                size="lg"
              >
                {item}
              </NextUILink>
            </NavbarMenuItem>
          ))} */}
        </NavbarMenu>
      </Navbar>
    </motion.nav>
  );
}
