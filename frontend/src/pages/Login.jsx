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
import { useState } from 'react';

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
  const handleRegistration =(e,type)=>{
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log(inputData);
    e.preventDefault();
    console.log(type);
  }
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === 'signup') {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  return (
    <div className="flex justify-center items-center py-10 ">
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
              <Button onClick={(e)=>handleRegistration(e,"signup")} >Sign Up</Button>
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
              <Button onClick={(e)=>handleRegistration(e,"login")} >Log In</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
