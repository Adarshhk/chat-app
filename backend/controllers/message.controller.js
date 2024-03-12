import {Message} from '../models/message.model.js'
import {Conversation} from '../models/conversation.model.js'
import { getReceiverSocketId , io } from '../socket/socket.js';

export const sendMessage = async (req , res) => {
    try {

        const {id: recieverId} = req.params;
        const {message} = req.body;

        const senderId = req.user._id;

        let convo = await Conversation.findOne({
            participants : {
                $all : [senderId, recieverId]
            }
        });

        if(!convo)
        {
            convo = await Conversation.create({
                participants : [senderId , recieverId],
            });
        }

        const newMessage = new Message({
            sender : senderId,
            reciever : recieverId,
            message,
        })
        if(newMessage)
        {
            convo.messages.push(newMessage._id);
        }
        
//will integrate socket.io here

        await Promise.all([newMessage.save() , convo.save()]);

        const receiverSocketId = getReceiverSocketId(recieverId);

        if(receiverSocketId)
        {
            io.to(receiverSocketId).emit("newMessage" , newMessage);
        }

        return res.status(200).json(newMessage)
        
    } catch (error) {
        console.log("Error in sendMessage controller." , error.message)
        res.status(500).json({error : "Internal server error."});
    }
}

export const getMessage = async (req , res) => {
    try {

        const {id : chatterId} = req.params;
        const userId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [chatterId , userId]}
        }).populate("messages")
        
        if (!conversation) return res.status(200).json([]);

        return res.status(200).send(conversation.messages);
        
    } catch (error) {
        console.log("Error in getMessage controller." , error.message)
        res.status(500).json({error : "Internal server error."});
    }
}