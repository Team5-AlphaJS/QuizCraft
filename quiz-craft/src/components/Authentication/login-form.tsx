import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { loginUser } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../ui/use-toast';
import { Link } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().min(2, {
    message: 'Username or email must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export function LoginForm({ hideLoginForm }: { hideLoginForm: () => void }) {
  const { setContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const credential = await loginUser(values.email, values.password);
      setContext({ user: credential.user, userData: null });
      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in.',
      });
      navigate('/');
      hideLoginForm();
    } catch (error) {
      toast({
        title: 'Login Error',
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
        <p className="text-center">or</p>
        <Button asChild>
          <Link to="/register">Create an Account</Link>
        </Button>
      </form>
    </Form>
  );
}
