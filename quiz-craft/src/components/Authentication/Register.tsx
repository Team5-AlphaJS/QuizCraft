import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { registerUser } from '@/services/auth.service';
import { createUserHandle, getUserByUsername } from '@/services/users.service';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Register() {
  const { setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
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
        role: 'student',
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
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="First Name"
          {...register('firstName', { required: true })}
        />
        {errors.firstName && <p>First name is required</p>}

        <Input
          type="text"
          placeholder="Last Name"
          {...register('lastName', { required: true })}
        />
        {errors.lastName && <p>Last name is required</p>}

        <Input
          type="text"
          placeholder="Username"
          {...register('username', { required: true })}
        />
        {errors.username && <p>Username is required</p>}

        <Input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
        />
        {errors.email && <p>Email is required</p>}

        <Input
          type="password"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors.password && <p>Password is required</p>}

        <Button onClick={() => navigate('/')}>Back</Button>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}
