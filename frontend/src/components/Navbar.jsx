import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Menu, School2 } from 'lucide-react';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from './DarkMode';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    await logoutUser();
    navigate('/login');
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || 'User logged out');
    }
  }, [isSuccess]);

  return (
    <div className="md:h-14 h-14 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10  ">
      {/* for desktop  */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full p-3">
        <div className="flex items-center gap-2">
          <School2 size={'30'} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </div>
        {/* user icons and dark mode button */}
        <div className="flex items-center gap-8">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoURL || 'https://github.com/shadcn.png'}
                  />
                  <AvatarFallback>ACC</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user.role === 'instructor' && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button onClick={() => navigate('/login')}>Sign Up</Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* for mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <div className="flex items-center gap-2">
          <h1 className="font-extrabold text-2xl">E-Learning</h1>
        </div>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = 'instructor';
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full bg-gray-200 hover:bg-gray-400"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <div>
          <SheetHeader className="flex flex-row items-baseline justify-between mt-3">
            <SheetTitle>E-Learning</SheetTitle>
            <DarkMode />
          </SheetHeader>
          <SheetDescription>
            {/* You can toggle the theme, check out your courses, and edit your profile here. */}
          </SheetDescription>
        </div>
        <DropdownMenuSeparator className="mr-2 " />
        <nav className="flex flex-col space-y-4">
          <span>My Learning</span>
          <span>Edit Profile</span>
          <span>Log Out</span>
        </nav>
        {role === 'instructor' && (
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Dashboard</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
