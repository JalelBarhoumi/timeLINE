require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require ('express-fileupload')
const registration=require('./models/Registration');
//////////////////////////////////////////////////////////
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postblogRoute = require("./routes/postblogs");
const questionRoute = require("./routes/questions");
const commentsRoute = require("./routes/comments");
const categoryRoute = require("./routes/categories");
const teamRoute = require("./routes/teamMember");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
//const postRoute = require('./routes/posts')
///////////////////youssef////////////////////////
const socket = require("socket.io");
// const TeamModel = require('./models/Team');
// const { findById } = require('./models/Team');


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true
}))
///////////////////////////////////////////////////////////
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});


// require('./routes/dialogFlowRoutes')(app);
app.use('/chatbot',require('./routes/dialogFlowRoutes'));
/////Routes////
app.use('/user',require('./routes/userRouter'))
app.use('/posts',require('./routes/posts'))
app.use('/userprofile',require('./routes/userProfileRouter'))
//////////////////////////////////////

app.use('/tasks',require('./routes/tasks'));
//app.use('/api/posts',postRoute)
//////////////////////ilyes////////////////////////////////
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/postblogs", postblogRoute);
app.use("/api/questions", questionRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentsRoute);
////////////////////////Jalel/////////////////////////
app.use('/projects',require('./routes/project'))
app.use('/phases',require('./routes/phases'))
//////////////////////////youssef/////////////////////////////
// //add a team
// app.post('/insert', async(req,res)=>{
//   const teamName = req.body.teamName
//   const teamDescription = req.body.teamDescription
//   const team = new TeamModel({teamName:teamName,teamDescription:teamDescription});
//   try {
//       await team.save();
//   } catch (error) {
//       console.log(error)
//   }
// });

// //get teams
// app.get('/read', async(req,res)=>{

//   TeamModel.find({}, (err,result)=> {
//       if(err){
//           res.send(err);
//       }
//       res.send(result);
//   })

// });

// //update a team
// app.put('/update', async(req,res)=>{
//   const newTeamName = req.body.newTeamName;
//   const id =req.body.id;
  
//   try {
//      await TeamModel.findById(id, (err,updatedTeam)=>{
//           updatedTeam.teamName = newTeamName;
//           updatedTeam.save();
//           res.send("update");
//       })
//   } catch (error) {
//       console.log(error)
//   }
// });

// //delete a team
// app.delete("/delete/:id", async(req,res)=>{
// const id = req.params.id;


// await TeamModel.findByIdAndRemove(id).exec();
// res.send("deleted");
// })

app.use("/api", teamRoute);

/////////coonnect to mongo db
// const CONNECTION_URL ='mongodb+srv://AmirMohamed:LsLtbqeQ8DyxQLeM@timesheet.gpv9g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const PORT = process.env.PORT || 5000;
// const server = app.listen(5000,()=>{
//   console.log('server running on port 5000.... ');
// });
// mongoose.connect(CONNECTION_URL)
//     .then(() =>app.listen(PORT, ()=>console.log('server running on port: '+PORT)))
//     .catch((error) =>console.log(error.message));
const URI = process.env.MONGODB_URL
mongoose.connect(URI,{
    
useNewUrlParser: true, 

useUnifiedTopology: true 


},err =>{
    if(err) throw err;
    console.log("connected to mongo db")
});




// const PORT = process.env.PORT || 5000
// app.listen(PORT,()=>{
//     console.log('server is running on port',PORT)
// })

//////////////////////////////////////////////////////////

const server = app.listen(5000,()=>{
  console.log('server running on port 5000.... ');
});

//chat process
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  }
});
io.on('connection',(socket)=> {
  console.log(socket.id);

  //recieving an event
  socket.on('join_room',(data)=> {
      socket.join(data)
      console.log("User Joined Room:" +data)
  })

  //create an event (2events exactly here )
  socket.on("send_message", (data)=> {
      console.log(data);
      socket.to(data.room).emit("recieve_message", data.content);
  })

  socket.on('disconnect',()=>{
      console.log('USER DISCONNECTED')
  })
})



