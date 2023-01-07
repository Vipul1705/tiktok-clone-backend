import express from 'express';
import mongoose from 'mongoose';
import Data from './data.js'
import Videos from './dbModel.js'

//app config
const app = express();
const port = 9000;
//middleware
app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*'),
    res.setHeader('Access-Control-Allow-Headers','*'),
    next()
})

//DB config
const connection_url="mongodb+srv://<username>:<password>@cluster1.txbq5vc.mongodb.net/tiktokDB?retryWrites=true&w=majority";

mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("Database Connected");
    }else{
        console.log(err);
    }
})







//api endpoints
app.get('/',(req,res)=>{
    res.status(200).send("hello tiktok fans")
})

app.get('/v1/posts',(req,res)=>{
    res.status(200).send(Data)
})

app.get('/v2/posts',(req,res)=>{
    Videos.find({},(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(200).send(data);
        }
    })
})

app.post('/v2/posts',(req,res)=>{
    const dbVideos=req.body;
    Videos.create(dbVideos,(err,data)=>{
        if(err){
            res.status(500).send(err);
        }
        else{
            res.status(201).send(data);
        }
    })
})



//listen
app.listen(port,()=>console.log(`listening on localhost: ${port}`));




