var db = require('../db_config.js');

exports.list = function(callback) {
    db.Item.find({}, function(error, items) {
        if(error) {
            callback({error: 'Error while retrieving items from database'})
        } else {
            callback(items);
        }
    });
};

exports.item = function(id, callback) {
    db.Item.findById(id, function(error, item) {
        if(error) {
            callback({error: 'Error while retrieving item id: ' + id});
        } else {
            callback(item);
        }
    });
};

exports.save = function(name, price, quantity, callback) {
    new db.Item({
        'name': name,
        'price': price,
        'quantity': quantity,
        created_at: new Date()
    }).save(function(error, item) {
        if(error) {
            callback({error: 'Error on adding item to database'});
        } else {
            callback(item);
        }
    }); 
};

exports.update = function(id, name, price, quantity, callback) {
    db.Item.findById(id, function(error, item) {
        if (name) {
            item.name = name;
        }

        if (price) {
            item.price = price;
        }
        
        if (quantity) {
            item.quantity = quantity;
        }

        item.save(function(error, item) {
            if (error) {
                callback({error: 'Não foi possível atualizar o item.'});
            } else {
                callback(item);
            }
        });
    });
};

exports.delete = function(id, callback) {
    db.Item.findById(id, function(error, item) {
        if(error) {
            callback({error: 'Não foi possível deletar o item...'})
        } else {
            item.remove(function (error) {
                if(!error) {
                    callback({response: 'Item excluido com sucesso'});
                }
            });
        }
    });
};


