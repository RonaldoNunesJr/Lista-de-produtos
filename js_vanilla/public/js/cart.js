const cart = {
    init: function (data) {

        $('body').on('click', '.cart .closeCart', function () {
            cart.hidden();
        });

        $('body').on('click', '.container ul.vitrine li a', function(){
            cart.add.display($(this).closest('[data-id]').data().id, data);
            cart.show();
        });

        $('body').on('click', '.cart .remove-button', function () {
            cart.remove($(this).closest('[data-id]').data().id);
        });

        this.managementPermanence.init(data);
    },
    managementPermanence : {
        init : function (data) {

            const getCookie = helpers.cookies.get('PermanenceManag');
            
            if (getCookie != undefined && getCookie != '') {

                if ( getCookie.indexOf(',') ) {
                    let idProds = getCookie.split(',');
                    idProds.forEach(function(id){
                        cart.add.display(id, data);
                        cart.show();
                    });
                } else {
                    cart.add.display(getCookie, data);
                    cart.show();
                }

            }

        },
        saveIds : function () {

            let itens = '';

            cart.add.objCartInfos.forEach(function(product){
                
                if ( itens === '' ) {
                    itens = product.id.toString();
                } else {
                    itens = `${itens}, ${product.id}` 
                }
                    
            });

            helpers.cookies.set('PermanenceManag', itens, 100);            
        }

    },
    add: {
        objCartInfos: [],
        feedsCartInfos : function (data) {
            
            const _this = cart.add;            
            let contObj = _this.objCartInfos.length;
            
            if ( contObj > 0 ) {
                
                let exist = false;
                
                for (let i = 0; i < contObj; i += 1) {
                    if (data.id === _this.objCartInfos[i].id) {
                        
                        alert("produto no carrinho")
                        // _this.objCartInfos[i].qtd += 1;
                        // cart.updateCart.init(_this.objCartInfos);
                        // _this.updateQtd(data);
                        exist = true;
                        break;
                    }
                }

                if ( !exist ) {
                    data.qtd = 1;
                    _this.objCartInfos.push(data);
                    cart.updateCart.init(_this.objCartInfos);
                    $('.cart .prods ul').append(cart.templates.prodCar(data));
                }
            } else {
                data.qtd = 1;
                _this.objCartInfos.push(data);
                cart.updateCart.init(_this.objCartInfos);
                $('.cart .prods ul').append(cart.templates.prodCar(data));
            }

            
        },
        updateQtd: function (product) {
            $('.cart .prods ul li[data-id="'+ product.id +'"] .infosProd .qtd em').html(product.qtd);
        },  
        display: function (id, data) {
            
            let _this = cart.add;
            let contData = data.length;

            for ( let i = 0; i < contData; i += 1 ) {
                
                if ( data[i].id == id ) {
                    cart.add.feedsCartInfos(data[i]);
                    break;
                
                }
    
            }                      

        }
    },
    updateCart : {
        init: function (data) {

            cart.managementPermanence.saveIds();
            this.totalCart(data);
            this.resumeCart();

        },
        totalCart: function (data) {

            console.log('totalCart');
            console.log('totalCart length data', data.length);
            
            if ( !data.length ) {
                console.log('totalCart caiu no if')
                cart.hidden();

            }

            let totalCart = 0;

            data.forEach(function (info) {
                totalCart += info.qtd;
            });

            $('.cart h2 span em').html(totalCart)

        },
        resumeCart: function() {
            const productsInCart = cart.add.objCartInfos;
            let installments = 0;
            let priceTotal = 0;

            productsInCart.forEach(function(prod){
                priceTotal += (prod.price * prod.qtd);
                installments += (prod.installments * prod.qtd);
            });
            

            $('.cart .resume .right').html(cart.templates.resumeCart({priceTotal: priceTotal, installments: installments}));

        }
    },
    remove: function (id) {
        $('.cart li[data-id="'+id+'"]').remove();

        let data = cart.add.objCartInfos;
        let contData = data.length;
        let position = 0;
        for ( let i = 0; i < contData; i +=1 ) {
            if ( data[i].id === id ) {
                position = i;
                break;
            }
        }

        cart.add.objCartInfos = helpers.removeArr(data, position);
        cart.updateCart.init(cart.add.objCartInfos);
    },  
    show: function () {
        $('body').addClass('active-cart');
    },
    hidden: function () {
       
        $('body').removeClass('active-cart');
       
    },
    templates : {
        prodCar : function (product) {
            
            const price = helpers.convertPrice({ valor: product.price });
            let priceSplit = price.split(',');

            return `
                <li data-id="${product.id}">
                    <div class="img"><img src="files/image/products/img${product.id + 1}.jpg" alt="${product.title}" /></div>
                    <div class="infosProd">
                        <div class="left">
                            <p class="description">${product.title}</p>
                            <p class="otherDescription" ${product.style == ""? 'style="display:none"':''}>${product.style}</p>
                            <p class="qtd">Quantidade: <em>${product.qtd}</em></p>
                        </div>
                        <div class="right">
                            <a href="javascript:;" class="remove-button">x</a>
                            <p class="price">R$ <b>${priceSplit[0]}</b>,${priceSplit[1]}</p>
                        </div>
                    </div>
                </li>
            `    
        },
        resumeCart : function (data) {
            
            let priceTotal = helpers.convertPrice({valor:data.priceTotal});
            let priceTotalSplit = priceTotal.split(',');
            let installments = helpers.createParcel({
                value: data.priceTotal,
                installments: data.installments > 12 ? 12 : data.installments
            });

            return `<p class="price">R$ <b>${priceTotalSplit[0]}</b>,${priceTotalSplit[1]}</p>
                <p class="parcel" ${installments.installments == 0 ? 'style="display:none;"':''}>ou em até <em class="parcel">${installments.installments} x</em> <em class="price">R$ ${installments.price}</em> </p>` 

        }
    } 
}