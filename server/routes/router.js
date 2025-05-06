import express from 'express'

import { signUp ,logIn} from '../controller/user_controller.js'

const router = express.Router()

import {createPost,loadPost} from '../controller/post.js'

import upload from '../multer/multer.js'


router.post("/signUp",signUp)
router.post("/logIn",logIn)
router.post('/posts', upload.single('image'),createPost)


router.get("/loadblog",loadPost)


export default router