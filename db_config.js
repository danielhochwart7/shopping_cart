var db_string = 'mongodb://127.0.0.1/shopping_cart';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'));

db.once('open', function() {
   var itemSchema = mongoose.Schema({

       name: String,
       price: Number,
       quantity: Number,
       created_at: Date
   });
   exports.Item = mongoose.model('Item', itemSchema);
});
