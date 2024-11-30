import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '@/features/api/authApi.js';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isloading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === 'signup') {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async (e, type) => {
    const inputData = type === 'signup' ? signupInput : loginInput;
    e.preventDefault();
    const action = type === 'signup' ? registerUser : loginUser;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || 'Sign Up Successful');
    }
    if (registerError) {
      toast.error(registerError.data.message || 'Sign Up Failed');
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || 'Log In Successful');
    }
    if (loginError) {
      toast.error(loginError.data.message || 'Log In Failed');
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError,
  ]);

  return (
    <div className="flex justify-center items-center py-10 mt-16">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="login">Log In</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, 'signup')}
                  placeholder="e.g. John"
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={signupInput.email}
                  placeholder="e.g. example@example.com"
                  onChange={(e) => changeInputHandler(e, 'signup')}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  placeholder="e.g. xyz"
                  onChange={(e) => changeInputHandler(e, 'signup')}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={(e) => handleRegistration(e, 'signup')}
              >
                {registerIsLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  'Sign Up'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Log In</CardTitle>
              <CardDescription>
                Login with your password here. After clicking, you'll be logged
                in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginInput.email}
                  placeholder="e.g. example@example.com"
                  onChange={(e) => changeInputHandler(e, 'login')}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  placeholder="e.g. xyz"
                  onChange={(e) => changeInputHandler(e, 'login')}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={(e) => handleRegistration(e, 'login')}
              >
                {loginIsLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Please wait
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
