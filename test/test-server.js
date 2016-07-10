var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('bestFriend List', function() {
    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('id');
                res.body[0].should.have.property('name');
                res.body[0].id.should.be.a('number');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('billy');
                res.body[1].name.should.equal('alan');
                res.body[2].name.should.equal('nick');
				storage.items.should.have.length(3);
                done();
            });
    });

    it('should add an item on post', function(done) {
       chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('Kale');
                storage.items.should.be.a('array');
                storage.items.should.have.length(4);
//		   		Milk is at 0
		   		storage.items[0].name.should.equal('billy');
                storage.items[3].should.be.a('object');
                storage.items[3].should.have.property('id');
                storage.items[3].should.have.property('name');
                storage.items[3].id.should.be.a('number');
                storage.items[3].name.should.be.a('string');
                storage.items[3].name.should.equal('Kale');
                done();
            });
    });
    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/:id')
			.send({
				'name': 'Waffles',
				'id': 0
				})
			.end(function(err, res) {
//				Waffles is now at 0. Not Milk
				storage.items[0].name.should.equal('Waffles');
				storage.items[1].name.should.equal('alan');
				storage.items[2].name.should.equal('nick');
				storage.items[3].name.should.equal('Kale');
				storage.items.should.have.length(4);
				done();
		}); 
    });
//	failing as of 4/27
	it('should delete an item on delete', function(done) {
		chai.request(app)
			.delete('/items/:id')
			.send({'id': 0}) 
			.end(function(err, res) {
				storage.items.should.have.length(3);
				done();
		});
	});
});

