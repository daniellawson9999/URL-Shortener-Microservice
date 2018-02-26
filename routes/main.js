const express = require('express');
const validate = require('valid-url');
const router = express.Router();
const Url = require('../models/url');

router.get('/new/:link(*)',(req,res) => {
  let url = req.params.link;
  console.log(url);
  if(!validate.isWebUri(url) || url === ""){
    res.send({
    error:"Wrong url format, make sure you have a valid protocol and real site."
    });
    return;
  }
  const NewUrl = new Url({url: url});
  NewUrl.save((error,product) => {
    if(error){
      res.sendStatus(500);
    }else{
      //this might need tweeking when deployed to heroku
      let shortUrl = req.protocol + '://' + req.get('host') + '/' + product.id;
      res.send({
        original_url: url,
        short_url: shortUrl
      });
    }
  });
});

router.get('/:id',(req,res) => {
  Url.findOne({_id: req.params.id},'url', (err,Url) => {
    if(err || !Url){
      res.send({
        error: "This url is not in the database."
      });
    }else{
      res.redirect(Url.url);
    }
  });
});

router.get('*',(req,res) => {
  res.render('index');
});

module.exports = router;
