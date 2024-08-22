const mongoose=require('mongoose');
require('dotenv').config();

const url = process.env.DATABASE_URI;

mongoose.connect(url);

const db=mongoose.connection;

db.on('connected',()=>
    {
        console.log('database connected');
    });
    
    db.on('error',()=>{
        console.log('error')
    });
    
    db.on('disconnected',()=>{
        console.log('database disconnected');
    })
    
module.exports=db;