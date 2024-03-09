import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getUsersForSideBar = async (req , res) => {
    try {
        
        const loggedInUserId = req.user._id;

        const allUsers = await User.find({
            _id : {$ne : loggedInUserId}
        })

        return res.status(201).json(allUsers)

    } catch (error) {
        console.log("Error in getUsersForSidebar controller." , error.message)
        res.status(500).json({error : "Internal server error."});
    }
}