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

Storage.prototype.remove = function(id) {
	for(i = 0; i < this.items.length; i++) {
		if(this.items[i].id == id) {            
            var index = this.items.indexOf(this.items[i]);
            return this.items.splice(index, 1);
        } 
    }
};

Storage.prototype.update = function(name, id) {
	for(i = 0; i < this.items.length; i++) {
		if(this.items[i].id == id) {
			this.items[i].name = name;
			return this.items[i];
		}
	}
	
//	var result = this.items.filter(function(value) {
//		console.log(value);
//		return value.id === id;
//	}).shift();
//	result.name = name;
//	console.log(result);
//	return result;
	
};

var storage = new Storage();
//storage.add('Milk');
//storage.add('Cereal');
//storage.add('Peppers');

var app = express();
app.use(express.static('public'));


app.get('/items', function(req, res) {
    res.json(storage.items);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.post('/items', function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function (req, res) {
    var id = req.params.id;
	var result = storage.remove(id);
    res.send(result);
});

app.put('/items/:id', function (req, res) {
	console.log(req.body);
	var id = req.body.id;
	var name = req.body.name;
	var result = storage.update(name, id);
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