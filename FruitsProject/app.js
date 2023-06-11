/*const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const url = "mongodb://localhost:27017";
const dbName = "fruitsDB";
const client = new MongoClient(url);

client.connect(function(err){
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  //insertDocuments(db, function(){
    //client.close();
  //});
  findDocuments(db, function(){
    client.close();
  });
});

const insertDocuments = function(db, callback){
  const collection = db.collection('fruits');
  collection.insertMany([
    {
      name: "Apple",
      score: 8,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 6,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great stuff!"
    }
  ], function(err, result){
    assert.equal(err, null);
    assert.equal(3, result.insertedCount);
    assert.equal(3, Object.keys(result.insertedIds).length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback){
  const collection = db.collection('fruits');
  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}
*/

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name specified."]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);
const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 8,
  review: "Absolutely love it!"
});

const person = new Person({
  name: "Angela",
  age: 32,
  favouriteFruit: pineapple
});
pineapple.save();
//fruit.save();
person.save();

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{

    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});

/*Fruit.updateOne({_id: ""}, {name: ""}, function(){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully updated!!");
  }
});
*/