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
import React from 'react';
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
import { Label } from './ui/label';
import { Input } from './ui/input';

const Navbar = () => {
  const user = true;
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
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>ACC</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-52">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>My Learning</DropdownMenuItem>
                  <DropdownMenuItem>Edit Profile</DropdownMenuItem>
                  <DropdownMenuItem>Log Out</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline">Log In</Button>
              <Button>Sign Up</Button>
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
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};


// 3:21:26