var express = require('express');

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {
		name: name, 
		id: this.id
	};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Milk');
storage.add('Cereal');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));


app.get('/items', function(req, res) {
    res.json(storage.items);
});

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});







//I want to be able to remove items by making a delete request that corresponds to the item's id. Any ideas?

//app.del('/items/:id', jsonParser, function (req, res) {
//    var id = req.params.id;
//    res.send(id);
//});





//test urls ------------------------------------------------------------------------
var router = require('./router.js');
app.get('/items/test', function(req, res) {
   router.test(req, res); 
});

app.get('/items/anothertest', function(req, res) {
   router.anotherTest(req, res); 
});

app.listen(process.env.PORT || 8080);