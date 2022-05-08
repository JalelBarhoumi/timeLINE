const express= require('express') ;
const mongoose= require ('mongoose');

const TaskMessage = require('../models/taskMessage.js') ;

const router = express.Router();

module.exports.getTasks = async (req, res) => { 
    try {
        const taskMessages = await TaskMessage.find({phaseId:req.params.id});
                
        res.status(200).json(taskMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports.getTask = async (req, res) => { 
    const { id } = req.params;

    try {
        const task = await TaskMessage.findById(id).populate('UserProfile');
        
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
// module.exports.createTask = async (req, res) => {
        
        
//         // const { name, description, userId,phaseId , deadline , estTime,completed } = req.body;
//         const { id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels } = req.body;
//         // const newTaskMessage = new TaskMessage({ name, description, userId,phaseId , deadline , estTime,completed  })
//     const newTaskMessage = new TaskMessage({ id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels  })
//         try {
//             await newTaskMessage.save();
    
//             res.status(201).json(newTaskMessage );
//         } catch (error) {
//             res.status(409).json({ message: error.message });
//         }
//     }

module.exports.createTask = async (req, res) => {
    
    
    // const { name, description, userId,phaseId , deadline , estTime,completed } = req.body;
    const { id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels,phaseId } = req.body;
    // const newTaskMessage = new TaskMessage({ name, description, userId,phaseId , deadline , estTime,completed  })
const newTaskMessage = new TaskMessage({ id,title, notes,  dueDate , startDate,completed, starred,important,deleted, labels,phaseId  })
    try {
        await newTaskMessage.save();

        res.status(201).json(newTaskMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports.updateTask = async (req, res) => {
    const { id } = req.params;
    // const { name, description, userId,phaseId , deadline , estTime,completed } = req.body;
    const { title, notes,  dueDate , startDate,completed, starred,important,deleted, labels } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    const updatedTask = { title, notes,  dueDate , startDate,completed, starred,important,deleted, labels, id: id };
    // const updatedTask = { title, notes,  dueDate , startDate,completed, starred,important,deleted, labels, id: id };
    await TaskMessage.findByIdAndUpdate(id, updatedTask, { new: true });

    res.json(updatedTask);
}

module.exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);

    await TaskMessage.findByIdAndRemove(id);

    res.json({ message: "task deleted successfully." });
}

module.exports.likeTask = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No task with id: ${id}`);
    
    const post = await TaskMessage.findById(id);

    const updatedTask = await TaskMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedTask);
}


