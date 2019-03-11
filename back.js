const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const fs = require('fs');
const app = express();
app.use(cors());

const dbfile = "products.db";
const db = new sqlite3.Database(dbfile);


db.serialize( () => {
    if (!fs.existsSync(dbfile)){
        db.run('CREATE TABLE products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT UNIQUE, product_price TEXT, product_img TEXT)');
        db.run('INSERT INTO products (product_name, product_img, product_price) VALUES (?, ?, ?)','Mega TrotSpeed','images/trot1.jpg','1249,99 €');
        db.run('INSERT INTO products (product_name, product_img, product_price) VALUES (?, ?, ?)','Medium TrotSpeed','images/trot2.jpg','529,99 €');
        db.run('INSERT INTO products (product_name, product_img, product_price) VALUES (?, ?, ?)','Light TrotSpeed','images/trot3.jpg','134,99 €');

        db.run('CREATE TABLE accessories (accessorie_id INTEGER PRIMARY KEY AUTOINCREMENT, accessorie_name TEXT UNIQUE, accessorie_price NUMBER, accessorie_img TEXT )');
        db.run('INSERT INTO accessories (accessorie_name, accessorie_img, accessorie_price) VALUES (?, ?, ?)','City Wheel TrotSpeed','images/acce1.jpg','20');
        db.run('INSERT INTO accessories (accessorie_name, accessorie_img, accessorie_price) VALUES (?, ?, ?)','Cross Wheel TrotSpeed','images/acce2.jpg','30');
        db.run('INSERT INTO accessories (accessorie_name, accessorie_img, accessorie_price) VALUES (?, ?, ?)','Webbing TrotSpeed','images/acce3.jpg','19.99');





        db.all('SELECT * FROM products', function(error, data){
            if (!error) console.log(data);
                else console.log(error);
        });
        db.all('SELECT * FROM accessories', function(error, data){
            if (!error) console.log(data);
                else console.log(error);
        });
}});

app.get('/products.html',function (request, response){
    db.all('SELECT * FROM products', function (error, data){
         response.send(data);
     });
});
app.get('/accessories.html',function (request, response){
    db.all('SELECT * FROM accessories', function (error, data){
         response.send(data);
     });
});
app.listen(3000, function (error){
   if(!error) console.log('app listening port 3000');
});