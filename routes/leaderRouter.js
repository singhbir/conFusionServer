const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const leaderRoute = express.Router();
const Leaders = require('../models/leaders')

leaderRoute.use(bodyparser.json());

leaderRoute.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((leaders) => {
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leaders);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req,res,next)=>{
    res.statusCode = 403
    res.end("Put method not supported on  /leaders")
})
.delete((req,res,next)=>{
    Leaders.remove({})
    .then((leader) => {
        res.statusCode=200;
        res.setHeader("Content-Type","application/json");
        res.json(leader);
    },(err)=>next(err))
    .catch((err)=>next(err))
});


leaderRoute.route('/:leaderId')
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leader) => {
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post method not supported on /leaders/:leaderId"+req.params.leaderId)
})
.put((req,res,next)=>{
   Leaders.findByIdAndUpdate(req.params.leaderId,{
       $set:req.body
   }, {new:true})
   .then((leader)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json");
    res.json(leader)
   },(err)=>next(err))
   .catch((err)=>next(err))
})
.delete((req,res,next)=>{
   Leaders.findByIdAndRemove(req.params.leaderId)
   .then((leader)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json");
    res.json(leader)
   },(err)=>next(err))
   .catch((err)=>next(err))
});

module.exports = leaderRoute;