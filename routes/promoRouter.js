const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Promotion = require('../models/promotions')

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get((req,res,next)=>{
    Promotion.find({})
    .then((promotions)=>{
        res.statusCode=200;
        res.setHeader("Content-type","application/json")
        res.json(promotions)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    Promotion.create(req.body)
    .then((promotion)=>{
        res.statusCode=200;
        res.setHeader("Content-type","application/json")
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req,res,next)=>{
    res.statusCode = 403
    res.end("Put method not supported")
})
.delete((req,res,next)=>{
    Promotion.remove({})
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader("Content-type","application/json")
        res.json(promotion)
    },(err)=>next(err))
    .catch((err)=>next(err))
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    Promotion.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode = 200
        res.setHeader("Content-type","application/json")
        res.json(promotion)
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post method not supported on /promo/:promoId"+req.params.promoId)
})
.put((req,res,next)=>{
    Promotion.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promotion)=>{
        res.statusCode = 200
        res.setHeader("Content-type","application/json")
        res.json(promotion)
    },(err)=>next(err))
    .catch((err)=>next(err))    
})
.delete((req,res,next)=>{
    Promotion.findByIdAndRemove(req.params.promoId)
    .then((promotion)=>{
        res.statusCode = 200
        res.setHeader("Content-type","application/json")
        res.json(promotion)
    },(err)=>next(err))
    .catch((err)=>next(err))
});

module.exports = promoRouter;