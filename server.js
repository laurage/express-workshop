var express = require('express');
var formidable = require('express-formidable');
var fs = require('fs');

var app = express();

app.use(express.static("public"));
app.use(formidable());

app.post('/create-post', function(req, res){
  // // BLOG CONTENT TO ADD
  var timestamp = Date.now().toString();
  // var blogContent = {timestamp: req.fields};

  // // CONVERT TO JSON FILE
  // var blogContentJson = JSON.stringify(blogContent);

  // READ THE JSON FILE
  fs.readFile(__dirname + '/data/posts.json', function(error, file){
    // Convert buffer to string
    var jsonContent = file.toString();
    // Convert string to JS object
    var parsedFile = JSON.parse(jsonContent)
    // Add a key/value pair to the JS object
    parsedFile[timestamp] = req.fields.blogpost;
    // Convert JS object into JSON
    var stringifiedFile = JSON.stringify(parsedFile);

    // WRITE IN THE JSON FILE
    fs.writeFile(__dirname + '/data/posts.json', stringifiedFile, function(error){
    });
  });

  // res.redirect('/get-posts');

  res.sendFile(__dirname + '/data/posts.json');
});

// app.get('/get-posts', function(req, res){
//   res.sendFile(__dirname + '/data/posts.json');
// });

app.listen(3000, function(){
  console.log('Server is listening on port 3000. Ready to accept requests1');
});
