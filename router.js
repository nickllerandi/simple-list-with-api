function test(request, response) {
  if (request.url === '/items/test') {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('this test is working');
  }
}

function anotherTest(request, response) {
  if (request.url === '/items/anothertest') {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("this 'another test' is working");
  }
}

module.exports.test = test;
module.exports.anotherTest = anotherTest;