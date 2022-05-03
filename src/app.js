const createError = require('http-errors');
const express = require('express');
const path = require('path');

const logger = require('morgan');
const cors =require("cors");
const config= require("config")
const Logger=require("./logger");





const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/",async (req,res,next)=>{
    res.send(`application is working on ${config.get("configName")}`);
})
app.get("/api1", async (req,res,next)=>{
  Logger.info("api1 called");

  res.send("api1 working fine");
})

app.listen(process.env.PORT| 8080,function(){
    console.log("application is running")
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500 );
  res.send('error');
});

      