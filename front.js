$.get('http://localhost:3000/products',function (response){
    response.forEach(function (prod){
        new Product(prod.name, prod.product_img, prod.price);
    })
});

var products = [];

class Product{

        constructor(name, image, price){
            this.name = name;
            this.image = image;
            this.price = price;
            this.body = document.body;
            products.push(this);
        }

        create(){
            this.title = document.createElement('div');

        }

        setAtt(){
            this.title.setAttribute('id', 'title1');
        }
        
        append(){
            this.body.appendChild(this.title);
            this.title.appendChild()
        }

        fill(){

        }
}