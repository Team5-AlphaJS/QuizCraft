import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Input as NextUIInput } from '@nextui-org/react';
import { Button } from '../ui/button';
import { useContext, useState } from 'react';
import { AuthContext } from '/context/AuthContext';
import { getUserByUsername } from '/services/users.service';
import { registerUser } from '/services/auth.service';
import { createUserHandle } from '/services/users.service';
import { EyeSlashFilledIcon } from '../Icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../Icons/EyeSlashIcon';
import { MailIcon } from '../Icons/MailIcon';
import { User, Phone, UserSearchIcon } from 'lucide-react';
import { Select, SelectItem } from '@nextui-org/react';

export default function Register() {
  const { setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();
  const iconClasses =
    'text-2xl text-default-400 pointer-events-none flex-shrink-0';
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const roles = [
    { label: 'Student', value: 'Student' },
    { label: 'Educator', value: 'Educator' },
  ];

  const onSubmit = async (data) => {
    try {
      const existingUsernameSnapshot = await getUserByUsername(data.username);

      if (existingUsernameSnapshot.exists()) {
        toast({
          title: 'Registration Error',
          description:
            'Username already exists. Please choose a different username.',
        });

        return;
      }

      const credential = await registerUser(data.email, data.password);

      const userData = {
        uid: credential.user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role,
        createdOn: Date.now(),
        // optional fields
        // city: '',
        // country: '',
        photo: '',
      };

      await createUserHandle(userData);
      setContext({ user: credential.user, userData });

      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered.',
      });

      navigate('/');
    } catch (error) {
      toast({
        title: 'Registration Error',
        description: error.message,
      });
    }
  };

  return (
    <div className='mb-20 flex items-center justify-center'>
      <div className="w-1/4 p-5 mt-10 border-2 border-primary">
        <h1 className={'text-xl font-semibold text-center'}>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <NextUIInput
            autoFocus
            endContent={<User className={iconClasses} />}
            variant="underlined"
            type="text"
            placeholder="First Name"
            {...register('firstName', {
              required: 'First name is required',
              minLength: {
                value: 1,
                message: 'First name must be at least 1 character',
              },
              maxLength: {
                value: 30,
                message: 'First name must not exceed 30 characters',
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: 'Invalid first name format',
              },
            })}
          />
          {errors.firstName && (
            <p className="text-danger-500">{errors.firstName.message}</p>
          )}

          <NextUIInput
            endContent={<User className={iconClasses} />}
            variant="underlined"
            type="text"
            placeholder="Last Name"
            {...register('lastName', {
              required: 'Last name is required',
              minLength: {
                value: 1,
                message: 'Last name must be at least 1 character',
              },
              maxLength: {
                value: 30,
                message: 'Last name must not exceed 30 characters',
              },
              pattern: {
                value: /^[a-zA-Z\s]*$/,
                message: 'Invalid last name format',
              },
            })}
          />
          {errors.lastName && (
            <p className="text-danger-500">{errors.lastName.message}</p>
          )}

          <NextUIInput
            endContent={<UserSearchIcon className={iconClasses} />}
            variant="underlined"
            type="text"
            placeholder="Username"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
              maxLength: {
                value: 30,
                message: 'Username must not exceed 30 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+$/,
                message: 'Invalid username format',
              },
            })}
          />
          {errors.username && (
            <p className="text-danger-500">{errors.username.message}</p>
          )}

          <Select
            label="Select a role"
            variant="underlined"
            {...register('role', {
              required: 'Role is required',
            })}
          >
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                {role.label}
              </SelectItem>
            ))}
          </Select>
          {errors.role && (
            <p className="text-danger-500">{errors.role.message}</p>
          )}

          <NextUIInput
            endContent={<Phone className={iconClasses} />}
            variant="underlined"
            type="phone"
            placeholder="Phone"
            {...register('phone', {
              required: 'Phone number is required',
              minLength: {
                value: 10,
                message: 'Phone number must be 10 digits',
              },
              maxLength: {
                value: 10,
                message: 'Phone number must be 10 digits',
              },
              pattern: {
                value: /^\d+$/,
                message: 'Invalid phone number format',
              },
            })}
          />
          {errors.phone && (
            <p className="text-danger-500">{errors.phone.message}</p>
          )}

          <NextUIInput
            endContent={<MailIcon className={iconClasses} />}
            variant="underlined"
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: 'Email address is not valid',
              },
            })}
          />
          {errors.email && (
            <p className="text-danger-500">{errors.email.message}</p>
          )}

          <NextUIInput
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className={iconClasses} />
                ) : (
                  <EyeFilledIcon className={iconClasses} />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            variant="underlined"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="text-danger-500">{errors.password.message}</p>
          )}
          <Button className="mt-4 mr-2" onClick={() => navigate('/')}>
            Back
          </Button>
          <Button type="submit">Register</Button>
        </form>
      </div>
    </div>
  );
}
