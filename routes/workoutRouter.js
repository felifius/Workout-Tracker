import express from 'express';
import { createWorkout, deleteWorkout, listWorkout, scheduleWorkout, updateWorkout, generateReport } from '../controller/controlWorkout.js';
import { checktoken } from '../controller/authtoken.js';

const router = express.Router();


router.post('/addworkout', checktoken, createWorkout);
router.get('/listworkout/:userEmail', checktoken, listWorkout);
router.get('/generatereport/:userEmail', checktoken, generateReport);
router.put('/updateworkout/:name', checktoken, updateWorkout);
router.delete('/deleteworkout/:name', checktoken, deleteWorkout);
router.put('/scheduleWorkout/:name', checktoken, scheduleWorkout);



export default router;