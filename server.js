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

Storage.prototype.remove = function(itemId) {
    console.log('passed in: ' + itemId);
    console.log(this.items, 'items');
    console.log("Total array length: " + this.items.length);
    for(i = 0; i < this.items.length; i++) {
        console.log("This item's id: " + this.items[i].id );
        if(this.items[i].id == itemId) {            
            var deleteMe = this.items[i];
            var index = this.items.indexOf(deleteMe);
            return this.items.splice(index, 1);
        } 
    }
    return "Error: Item not found.";
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

app.delete('/items/:id', function (req, res) {
    var id = req.params.id;
	var result = storage.remove(id);
	console.log(result, 'result');
    res.send(result);
});

//test urls ------------------------------------------------------------------------

var router = require('./router.js');
app.get('/items/test', function(req, res) {
   router.test(req, res); 
});

app.get('/items/anothertest', function(req, res) {
   router.anotherTest(req, res); 
});
//-------------------------------------------------------------------------------------

exports.app = app;
exports.storage = storage;

app.listen(process.env.PORT || 8080);