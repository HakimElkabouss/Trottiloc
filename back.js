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
        db.run('CREATE TABLE products (product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT UNIQUE, product_price NUMBER, product_img TEXT)');
        db.run('INSERT INTO products (product_name, product_img, product_price) VALUES (?, ?, ?)','Mega TrotSpeed','images/trot1.png','1249,99');
        db.run('INSERT INTO products (product_name, product_img, product_price) VALUES (?, ?, ?)','Medium TrotSpeed','images/trot2.png','529,99');
        db.run('INSERT INTO products (product_name, product_img, product_price) VALUES (?, ?, ?)','Light TrotSpeed','images/trot3.png','134,99');

        






        db.all('SELECT * FROM products', function(error, data){
            if (!error) console.log(data);
                else console.log(error);
        });
}});

app.get('/products',function (request, response){
    db.all('SELECT * FROM products', function (error, data){
         response.send(data);
     });
});
app.listen(3000, function (error){
   if(!error) console.log('app listening port 3000');
});