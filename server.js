// DEPENDENCIES
var express      = require('express');
var port         = process.env.PORT || 3000;
var app          = express();

// MIDDLEWARE
app.use(express.static('build'));

app.use(express.static('examples'));

// DATABASE FOR LOCAL OR HEROKU DEPLOYMENT
// var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/dazzle';
// mongoose.connect(mongoUri);

// LISTENER
app.listen(port);
console.log('server working');

