import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import React from 'react';
import Course from './Course';

const Profile = () => {
  const enrolledCourses = [1];
  return (
    <div className="max-w-4xl mx-auto my-20 px-4">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ACC</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:{' '}
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                Asm Courses
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                asm@gmail.com
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                INSTRUCTOR
              </span>
            </h2>
          </div>
          <DialoguePart />
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg ">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-3">
          {enrolledCourses.length === 0 ? (
            <p className="opacity-50">You haven't enrolled any courses.</p>
          ) : (
            enrolledCourses.map((value, index) => <Course key={index} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const DialoguePart = () => {
  const isLoading = false;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="mt-2">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save once you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="E.g. John"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="photo" className="text-right">
              Profile Picture
            </Label>
            <Input
              type="file"
              id="photo"
              accept="image/*"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};