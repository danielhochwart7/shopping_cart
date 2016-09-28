var app = require('./app_config.js');

var itemController = require('./controller/itemController.js');

app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.get('/items', function(req, res) {
    itemController.list(function(resp) {
        res.json(resp);
    })
});

app.post('/items', function(req, res) {
    
    var name = req.param('name');
    var price = req.param('price');
    var quantity = req.param('quantity');

    itemController.save(name, price, quantity, function(resp) {
        res.json(resp);
    })
});

app.get('/items/:id', function(req, res) {
    var id = req.param('id');
    itemController.item(id, function(resp) {
        res.json(resp);
    })
});


app.put('/items', function(req, res) {
    var id = req.param('id');
    var name = req.param('name');
    var price = Number(req.param('price'));

    itemController.update(id, name, price, function(resp) {
        res.json(resp);
    })
});

app.delete('/items/:id', function(req, res) {
    var id = req.param('id');

    itemController.delete(id, function(resp) {
        res.json(resp);
    })
});
