// NPM Packages

//Express
var express= require("express");

var app= express();

//EJS

app.set("view engine", "ejs");

//Public Assets

app.use(express.static('public'));

//MongoDB

var mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost/to_do_list');

var toDoSchema= new mongoose.Schema({
    text: String
});

var ToDo=mongoose.model("ToDo", toDoSchema);

//Body-Parser

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

//Method Override

var methodOverride = require('method-override');

app.use(methodOverride("_method"));

//Default Route

app.get("/", function(req, res) {
    
    res.redirect("/list");
});



app.get("/list", function(req, res) {
    
    ToDo.find({}, function(err, todo) {
        
        if (err) {
            
            console.log(err);
        }
        
        else {
            
            res.render("landing", {todo: todo});

            console.log(todo);
        }
    });
});


app.get("/list/new", function(req, res) {
    
    res.render("new");
});

app.get("/list/:id/edit", function(req, res) {
    
        ToDo.findById({_id: req.params.id}, function(err, todo) {
        
        if (err) {
            
            console.log(err);
        }
        
        else {
            
            res.render("edit", {todo: todo});
        }
    });
});


app.get("/list/:id", function(req, res) {
    
        ToDo.findById({_id: req.params.id}, function(err, todo) {
        
        if (err) {
            
            console.log(err);
        }
        
        else {
            
            res.render("show", {todo: todo});
        }
    });
});

app.put("/list/:id", function(req, res) {
    
        ToDo.findByIdAndUpdate({_id: req.params.id}, req.body.todo, function(err, todo) {
        
        if (err) {
            
            console.log(err);
        }
        
        else {
            
            res.redirect("/list")
        }
    });

});

app.delete("/list/:id", function(req, res) {
    
    ToDo.findByIdAndRemove(req.params.id, function(err, blog) {
        
        if (err) {
            console.log(err);
        }
        
        else {
            res.redirect("/list");
        }
    })
});

app.post('/list', function(req, res) {
    
    var toDoItem= req.body.todo;
    
    var toDoObject= {text: req.body.todo};
    
    ToDo.create ( 
         toDoObject, function(err, todo) {
         if (err) {
             
             console.log(err);
         }
         
         else {
             
        res.redirect("/list"); 
        
         }
     });
    
});


app.listen(8080, function() {
    
    console.log("Your web server is up and running!");
});



