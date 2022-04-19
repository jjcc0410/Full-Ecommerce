import { Router } from "express";
const router = Router()
import User from '../models/User'
import asyncWrapper from '../middleware/asyncWrapper'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import {} from 'dotenv/config'

// REGSITER
router.post('/register', asyncWrapper(async (req, res) => {
    // receive new user from request
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        // encrypt password of new user so it can't be accessed by someone who can see the DB
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })
    // save user
    const savedUser = await newUser.save()
    // give back newly created user info
    res.send(savedUser)
}))

// LOGIN
router.post('/login', asyncWrapper(async (req, res) => {
    // receive name from user
    const user = await User.findOne({ username: req.body.username })
    // if no username is found on the DB send an error
    !user && res.status(401).json('Wrong user credentials')

    // decrypt password from the DB
    const hashedPassword = CryptoJS.AES.decrypt(
        user.password, 
        process.env.PASS_SEC)
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    // if passwords are not equal
    originalPassword !== req.body.password && res.status(401).json('Wrong password credentials')

    // create a jwt
    const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SEC, { expiresIn: '3d' })
    // remove password from the response
    const { password, ...others } = user._doc
    // if everything is ok send response
    res.status(200).json({...others, accessToken})
}))

export default router