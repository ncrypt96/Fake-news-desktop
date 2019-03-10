var validUrl = require('valid-url');
  


var validUrl = require('valid-url');
  
if (validUrl.isUri("http://www.google.com")){
    console.log('Looks like an URI');
} else {
    console.log('Not a URI');
}