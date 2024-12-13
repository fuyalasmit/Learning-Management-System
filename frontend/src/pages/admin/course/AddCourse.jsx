import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [Category, setCategory] = useState('');
  const navigate = useNavigate();
  const isLoading = false;
  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = () => {};
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4 ">
        <h1 className="font-bold text-xl">Create a new course.</h1>
        <p className="text-sm">Add some basic details to your course.</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            placeholder="Place your course name here."
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select onValueChange={getSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="AI/ML">AI/ML</SelectItem>
                <SelectItem value="DevOps">DevOps</SelectItem>
                <SelectItem value="Cloud">Cloud</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate(`/admin/course`)}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={createCourseHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </>
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
