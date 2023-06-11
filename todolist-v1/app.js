const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const app = express();
let items =[];
let workItems =[];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItems: items});
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/", function(req, res){
    let item = req.body.newItem;
    console.log(req.body);
    if(req.body.list === "Work List"){
         workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");

});

app.listen(5500, function(){
    console.log("Server has started on port 5500.");
});