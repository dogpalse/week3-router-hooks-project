const express = require("express");
const app =  express();

app.listen(3355, () => {
    console.log("Server Start...!", "http://localhost:3355")
});

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

const Client = require("mongodb").MongoClient;

app.get("/recipe", (request, response) => {
    var page = request.query.page;
    var rowSize = 12;
    var skip = (page * rowSize) - rowSize;
    var url = "mongodb://211.238.142.181:27017";
    Client.connect(url, (err, client) => {
        var db = client.db('mydb');
        db.collection('recipe').find({}).skip(skip).limit(rowSize).toArray((err, docs) => {
            response.json(docs);
            console.log(docs);
            client.close();
        });
    })
})