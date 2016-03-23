var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();
var http = require('http');
var xml2js = require('xml2js');
var Visitor = require('./models/visitorSearch');
var Gaq = require('./models/gaq');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/', client);



var apiForwardingHost = 'http://api.indeed.com/ads/apisearch'


var mongoose = require('mongoose');
var db = mongoose.connection;
var uri = 'mongodb://admin:admin@ds061218.mlab.com:61218/testdatabase'
mongoose.connect(uri, function(err) {
  if (err) { console.log(err); return; }
  console.log("Client DB: connected"); 
});

app.listen(3000, function() {
   console.log("pls work"); 
});

//var router = express.Router();

    app.post('/admin', function(req, res) {
        console.log('foo')
        var correctLogin = false;
        //console.log(req.body);
        if(req.body.username == "admin" && req.body.password == "admin"){
             Visitor.find(function(err, visitors) {
            if (err){
                console.log("there was an error");
                console.log(err);
                res.send(err);
            }

            console.log(visitors);
            console.log("end visitors");
            res.json(visitors);
        });
        }
        else {
            res.send("error")
        }
    })
 
app.get("/getJobs/:publisher?/:jobTitle?/:location?/:start?/:limit?/:channel?", function(req, res) {
    console.log("Request made to /getJobs/");
    var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;    
     console.log("This is my ip address");
     console.log(ip);   
    //"http://api.indeed.com/ads/apisearch?publisher=" + publisher + "&l=" + jobFactory.getLocation + "&start=" + jobFactory.getStart + "&limit=" + jobFactory.getLimit + "&chnl=" + channel + "&v=2",
    var publisher = req.params.publisher ? req.params.publisher : "";
    var location = req.params.location ? req.params.location : "";
    var start = req.params.start ? req.params.start : "";
    var limit = req.params.limit ? req.params.limit : "";
    var channel = req.params.channel ? req.params.channel : "";
    var jobTitle = req.params.jobTitle ? req.params.jobTitle : "";
    var finalURL = apiForwardingHost + "?publisher=" + publisher + "&q=" + jobTitle + "&l=" + location + "&start=" + start + "&limit=" + limit + "&chnl=" + channel + "&v=2"
    var finalReturn;
      //console.log("publisher " + publisher + " " + "location " + location + " " + "start " + start + " " + "limit " + limit + " " + "channel " + channel + " " + "jobTitle " + jobTitle);
     
      var aVisitor = new Visitor({  
        createdTimeStamp: new Date(),
        zipCode: location,
        searchTerm: jobTitle,
        ipAddress: ip
     });
     console.log("test one");
     console.log(aVisitor);
     console.log("test one");
      
      aVisitor.save(function(err) {
          console.log("test two");
            if (err){         
                console.log("foobarchoo");
                console.log(err);
            }
            console.log("Visitor created");                
        });
     
    http.get(finalURL, function(req) {
        var xmlbody = '';
        req.on('data', function(chunk) {
            xmlbody = xmlbody += chunk.toString();
        });

        req.on('end', function() {
            xml2js.parseString(xmlbody, function(err, result) {
                if (result) {
                    //console.log(JSON.stringify(result));
                    finalReturn = result;
                }
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
            });
            res.send(finalReturn);
            //res.end();
        });
        //return res.send();
    });
});

app.post("/gaq/Post", function(req, res){
    Gaq.findOne(function(err, gaqs) {
            if (err){
                console.log("there was an error");
                console.log(err);
                res.send(err);
            }
            console.log("this is the value " + req.body.value);
            if(gaqs){
                gaqs.value = req.body.value;
            } else {
                gaqs = new Gaq({
                    value: req.body.value
                });
            }
            
            gaqs.save(function(err){
               if(err){
                   res.send(err);
               } 
               
               res.json({message: "gaq updated"});
            });
         
        });
})

app.get("/gaq/get", function(req, res) {
    Gaq.findOne(function(err, gaqs) {
            if (err){
                console.log("there was an error");
                console.log(err);
                res.send(err);
            }

            console.log(gaqs);
            console.log("end gaqs");
            res.json(gaqs);
        });
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('error' + err.message);
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('error' + err.message);
});


module.exports = app;
