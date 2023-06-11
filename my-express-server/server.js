const express = require("express");
const app = express();
app.get("/", function(req, res){
    res.send("Hello");
});
app.get("/contact", function(req, res){
    res.send("Contact me @ vidyasager162@gmail.com");
});
app.get("/hobbies", function(req, res){
    res.send("I'm a cyclist.");
});
app.listen(3000, function(){
    console.log("Server started at port 3000.");
});