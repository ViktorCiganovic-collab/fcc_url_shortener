require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const dns = require('dns');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// Basic Configuration 
var port = process.env.PORT || 3000;

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});


let originalUrls = [];
let shortUrls = [];

// Your first API endpoint
app.post('/api/shorturl', function(req, res) {

const url = req.body.url;
const foundIndex = originalUrls.indexOf(url);
let urlPattern = /^http:\/\/(w{3}.)[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/gm

if(!url.includes("https://") && !url.includes("http://")) {

return res.json({ error:  'invalid url' });

} 

if(foundIndex < 0) {

  originalUrls.push(url);
  shortUrls.push(shortUrls.length);

  return res.json({
  original_url: url,
  short_url: shortUrls.length - 1
  })
}

  return res.json({
  original_url: url,
  short_url: shortUrls[foundIndex]
  })


});


app.get("/api/shorturl/:shorturl", (req, res) => {

  const shortUrl = parseInt(req.params.shorturl);
  const foundIndex = shortUrls.indexOf(shortUrl);

  if(foundIndex < 0) {
  return res.json({ "error": "No short URL found for the given input" })

  } 
  
  res.redirect(originalUrls[foundIndex]) 

})












  
