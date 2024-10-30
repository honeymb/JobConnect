import express from "express";
import { 
    changePassword, 
    login, logout,
     register, 
     resetPassword, 
     updateProfile,
    listUsers,
    getUserById,
editUserById } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/reset-password").post(resetPassword);
router.route("/change-password").post(changePassword);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);

router.route("/users").get(listUsers);  
router.route("/users/:id").get(isAuthenticated, getUserById); // Fetch user by ID
router.route("/users/:id/edit").put(editUserById);

export default router;

