import express from 'express';
import {register, login, deluser, getusers, logout} from '../controller/controlAuth.js';
import { checktoken } from '../controller/authtoken.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', checktoken, logout);
router.delete('/deluser/:email', checktoken, deluser);
router.get('/listusers', checktoken, getusers);

export default router;
