const express = require('express');

module.exports = function(req,res,next){
  if(req.originalUrl === "/favicon.ico"){
    res.sendStatus(204);
    //console.log("sent a favicon no content status")
  }else{
    next();
  }
}
