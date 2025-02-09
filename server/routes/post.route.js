import express from "express";
import { addPost, deletePost, getPost, updatePost } from "../controllers/post.controller.js";
const router = express.Router();

router.get("/getpost", getPost)
router.post("/addpost", addPost)
router.put("/updatepost", updatePost)
router.delete("/deletepost", deletePost)

export default router;