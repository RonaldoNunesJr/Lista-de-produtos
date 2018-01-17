App = {
    urlList: 'data/',
    init : function () {
        this.getList();
    },
    getList : function () {

        helpers.ajax({
            url : App.urlList,
            type : 'GET',
            callback : function (result) {
                console.log(result);
                App.creatDate(result.products);
            } 
        });

    },
    creatDate : function (data) {

        var tempUL = $('<ul class="vitrine"></ul>');
        
        data.forEach(function (product){
            tempUL.append(App.template.listProducts(product));
        });
    
        $('.container').append(tempUL);

        cart.init(data);
    },
    template : {
        listProducts: function (product) {
            const parcelInfos = helpers.createParcel({ value: product.price, installments: product.installments })
            const price = helpers.convertPrice({ valor: product.price });
            let priceSplit = price.split(',');

            return `<li data-id="${product.id}">   
                <a href="javascript:;"><img src="files/image/products/img${product.id+1}.jpg" alt="${product.title}" /></a>
                <p class="description"><a href="javascript:;">${product.title}</a></p>
                <section class="box-price">
                    <div class="price"><a href="javascript:;">R$ <b>${priceSplit[0]}</b>,${priceSplit[1]}</a></div>
                    <div class="installments ${ !parcelInfos.installments ? 'hidden' :''  } ">
                        <a href="javascript:;"> ou ${ parcelInfos.installments } x <em>R$ ${ parcelInfos.price }</em></a>
                    </div>
                </section>                
            </li>`;

        }
    }  

};

App.init();