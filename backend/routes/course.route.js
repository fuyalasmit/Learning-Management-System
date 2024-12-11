import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createCourse } from '../controllers/course.controller.js';

const router = express.Router();

router.route('/').post(isAuthenticated,createCourse);
//same like router.post("/register",register)

export default router;