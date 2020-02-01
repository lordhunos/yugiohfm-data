const mongoose = require('mongoose');

//mongoose.set('useNewUrlParser', true);
//mongoose.set('useFindAndModify', false);
//mongoose.set('useCreateIndex', true);
//mongoose.set('useUnifiedTopology', true);

let db = mongoose.connect('mongodb://localhost/ygofm_db', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then( function () { console.log('Connected to DB'); } )
    .catch( function (error) { console.log(error); } );

module.exports = db;

