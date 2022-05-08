const express =require('express') ;

const taskcontroller=require('../controllers/tasks.js');


const router = express.Router();

router.get('/task/:id', taskcontroller.getTasks);
router.post('/', taskcontroller.createTask);
router.get('/:id', taskcontroller.getTask);
router.patch('/:id', taskcontroller.updateTask);
router.delete('/:id', taskcontroller.deleteTask);
router.patch('/:id/likeTask', taskcontroller.likeTask);

module.exports=router;