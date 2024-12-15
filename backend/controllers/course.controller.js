import { Course } from '../models/course.model.js';
import { deleteMediaFromCloudinary, uploadMedia } from '../utils/cloudinary.js';

export const createCourse = async (req, res) => {
  try {
    const { courseTitle, category } = req.body;
    if (!courseTitle || !category) {
      return res.status(400).json({
        message: 'Course title and category both are required.',
      });
    }
    const course = await Course.create({
      courseTitle,
      category,
      creator: req.id,
    });
    return res.status(201).json({
      course,
      message: 'Course Created',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Failed to create course' });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({
        course: [],
        message: 'Course not found',
      });
    }
    return res.status(200).json({
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Failed to get course' });
  }
};

export const editCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
    } = req.body;
    const thumbnail = req.file;

    let course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: false,
        message: 'Course not found',
      });
    }
    let courseThumbnail;
    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
        await deleteMediaFromCloudinary(publicId);
      }
      //uploading thumbnail on cloudinary
      courseThumbnail = await uploadMedia(thumbnail.path);
    }
    const updateData = {
      courseTitle,
      subTitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: courseThumbnail?.secure_url,
    };
    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    return res.status(200).json({
      course,
      message: 'Course Updated Successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: 'Failed to edit course' });
  }
};
