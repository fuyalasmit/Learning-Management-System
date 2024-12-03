import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import React from 'react';

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
      <div className="relative">
        <img
          className="w-full h-36 object-cover rounded-t-lg"
          src="https://img-c.udemycdn.com/course/750x422/2337794_eff5_4.jpg"
          alt="html"
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3" >
        <h1 className="hover:underline font-bold text-lg truncate">
          HTML Complete Course in Nepali
        </h1>
        <div className='flex items-center justify-between' >
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8" >
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>ACC</AvatarFallback>
          </Avatar> 
          <h1 className='font-medium text-sm ' >Asm Courses</h1>
          <Badge className="bgblue600 text-white px-2 py-1 text-xs rounded-full" >Beginner</Badge>
        </div>
        </div>
        <div className='text-lg font-bold' >
            <span>रु 299</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
