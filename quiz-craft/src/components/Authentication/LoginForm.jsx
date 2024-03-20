import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '/context/AuthContext';
import { loginUser } from '/services/auth.service';
import { getUserByUsername } from '/services/users.service';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import PropTypes from 'prop-types';
import { User } from 'lucide-react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input as NextUIInput,
  Button as NextUIButton,
  Link as NextUILink,
} from '@nextui-org/react';
import { EyeFilledIcon } from '../Icons/EyeSlashIcon';
import { EyeSlashFilledIcon } from '../Icons/EyeSlashFilledIcon';

export function LoginForm({ isOpen, onOpenChange, onClose }) {
  const { setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const existingUsernameSnapshot = await getUserByUsername(data.username);
      const userValues = existingUsernameSnapshot.val();
      const userEmail = userValues?.email;
      const userRole = userValues?.role;

      if (userRole === 'Blocked') {
        toast({
          title: 'Your account is blocked!',
          description: 'You are not allowed to log in!',
        });
      } else {
        const credential = await loginUser(userEmail, data.password);
        setContext({ user: credential.user });
        toast({
          title: 'Log In Successful',
          description: 'You have successfully logged in.',
        });
        navigate('/home');
        onClose();
      }
    } catch (error) {
      toast({
        title: 'Log In Error',
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>

              <ModalBody>
                <NextUIInput
                  autoFocus
                  endContent={
                    <User className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Username"
                  placeholder="Enter your username"
                  variant="bordered"
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username is too short',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Username is too long',
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+$/,
                      message: 'Username is not valid',
                    },
                  })}
                />
                {errors.username && (
                  <p className="text-danger-500">{errors.username.message}</p>
                )}

                <NextUIInput
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? 'text' : 'password'}
                  label="Password"
                  placeholder="Enter your password"
                  variant="bordered"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                {errors.password && (
                  <p className="text-danger-500">{errors.password.message}</p>
                )}

                <div className="flex py-2 px-1 justify-between">
                  <p>
                    No account?{'  '}
                    <NextUILink
                      onClick={() => {
                        navigate('/register');
                        onClose();
                      }}
                      color="primary"
                      size="sm"
                      className={'cursor-pointer'}
                    >
                      Register here
                    </NextUILink>
                  </p>
                </div>
              </ModalBody>

              <ModalFooter>
                <NextUIButton color="danger" variant="flat" onPress={onClose}>
                  Close
                </NextUIButton>
                <NextUIButton
                  color="primary"
                  type="submit"
                  isLoading={isLoading}
                >
                  Sign in
                </NextUIButton>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

LoginForm.propTypes = {
  isOpen: PropTypes.bool,
  onOpenChange: PropTypes.func,
  onClose: PropTypes.func,
};
