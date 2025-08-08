import express from "express";
import register from "../controllers/register.js";
import login from "../controllers/login.js";
import getUser from "../controllers/getUser.js";
import auth from "../middlewares/auth.js";
import logout from "../controllers/logout.js";
import getAccess from "../controllers/getAccess.js";

const router  = express.Router();
router.post('/register', register);
router.post('/login', login);
router.get('/profile',auth,getUser);
router.get('/logout',logout);
router.get('/access', auth, getAccess);
export default router;