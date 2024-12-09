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
import React, { useEffect, useState } from 'react';
import Course from './Course';
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from '@/features/api/authApi';
import { toast } from 'sonner';

const Profile = () => {
  const { data, isLoading, refetch } = useLoadUserQuery(); // {} for query and [] for mutation & refetch for fetching data and displaying 

  if (isLoading) return <h1 className="mt-20">Profile Loading...</h1>;

  const  user  = data && data.user;

  return (
    <div className="max-w-4xl mx-auto my-20 px-4">
      <h1 className="font-bold text-2xl text-center md:text-left">Profile</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={user.photoURL || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>ACC</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.name}
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </h2>
          </div>
          <div className="mb-2">
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.role.toUpperCase()}
              </span>
            </h2>
          </div>
          <DialoguePart isLoading={isLoading} data={data} refetch={refetch} />
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg ">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-3">
          {user.enrolledCourses.length === 0 ? (
            <p className="opacity-50">You haven't enrolled any courses.</p>
          ) : (
            user.enrolledCourses.map((value, index) => (
              <Course course={value} key={value._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

const DialoguePart = ({ isLoading, data, refetch }) => {
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };
  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('profilePhoto', profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    if (dialogOpen && data?.user) {
      setName(data.user.name || '');
    }
  }, [dialogOpen, data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || 'Profile Updated');
    }
    if (isError) {
      toast.error(error.message || 'Failed to update profile');
    }
  }, [error,updateUserData, isSuccess, isError]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={onChangeHandler}
              accept="image/*"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={updateUserIsLoading}
            onClick={updateUserHandler}
            type="submit"
          >
            {updateUserIsLoading ? (
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
