import User from "../Models/User.js";
import Message from "../Models/Message.js";
import cloudinary from "../Lib/Cloudinary.js";
import {io, onlineUsersMap} from "../Server.js";

// Gets other friend users to chat 
export const getUsersForSidebar = async(req, res)=> {
    try {
        const userId = req.user._id;
        const filterUser = await User.find({_id: {$ne: userId}}).select("-password");  //ne = not equal

        //count no. of messages which is not seen 
        const unseenMassages = {}
        const promise = filterUser.map(async (user) => {
            const msg = await Message.find({senderId: user._id, recieverId: userId, seen: false});
            if(msg.length > 0){
                unseenMassages[user._id] = msg.length;
            }
        })
        await Promise.all(promise);
        res.json({success: true, users: filterUser, unseenMassages});
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}


// Get all messages for selected user id
export const getMessages = async (req, res) =>{
    try {
        const { id: selectedUserId} = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or : [
                { senderId: myId, recieverId: selectedUserId },
                { senderId: selectedUserId, recieverId: myId },
            ]
        })
        await Message.updateMany({senderId: selectedUserId, recieverId: myId}, {seen: true});
        res.json({success: true, messages});
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}


//Api to mark mesages for seen using message id
export const markMessageSeenById = async (req, res) =>{
    try {
        const { id } = req.params;
        await Message.findByIdAndUpdate(id , {seen: true});
        res.json({success: true});
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}


// Sending message to user
export const sendMessage = async (req, res) =>{
    try {
        const {text, image} = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            senderId, recieverId, text, image: imageUrl
        })

        // Emit the new message to the connected user
        const recieverSocketId = onlineUsersMap[recieverId];
        if(recieverSocketId){
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.json({success : true, newMessage})
        
    } catch (error) {
        console.log(error.message)
        res.json({success: false, message: error.message});
    }
}