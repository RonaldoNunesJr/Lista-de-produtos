const helpers = { 
    ajax : function (data) {

        const xhr = new XMLHttpRequest();
        
        xhr.open(data.type, data.url);

        xhr.addEventListener('load', function () {

            if (xhr.status === 200) {

                let resultado = xhr.responseText;
                data.callback(JSON.parse(resultado));

            } else {
                console.log(xhr.status);
                console.log(xhr.responseText);
            }

        });

        xhr.send();
    },
    convertPrice : function (configs) {

        configs = {
            valor: configs.valor || 00,
            casas: configs.casas || 2,
            separador_decimal: configs.separador_decimal || ',',
            separador_milhar: configs.separador_milhar || '.'
        }


        //var valor_total = parseInt(valor * (Math.pow(10,configs.casas)))	
        let inteiros = parseInt(parseInt(configs.valor * (Math.pow(10, configs.casas))) / parseFloat(Math.pow(10, configs.casas)));
        let centavos = parseInt(parseInt(configs.valor * (Math.pow(10, configs.casas))) % parseFloat(Math.pow(10, configs.casas)));

        if (centavos % 10 == 0 && centavos + "".length < 2) {
            centavos = centavos + "0";
        } else if (centavos < 10) {
            centavos = "0" + centavos;
        }

        let milhares = parseInt(inteiros / 1000);
        inteiros = inteiros % 1000;

        let retorno = "";

        if (milhares > 0) {
            retorno = milhares + "" + configs.separador_milhar + "" + retorno
            if (inteiros == 0) {
                inteiros = "000";
            } else if (inteiros < 10) {
                inteiros = "00" + inteiros;
            } else if (inteiros < 100) {
                inteiros = "0" + inteiros;
            }
        }

        retorno += inteiros + "" + configs.separador_decimal + "" + centavos;
        
        return retorno;
    },
    createParcel : function (configs, callback) {
        configs = {
            value: configs.value || 0,
            installments: configs.installments || 0
        }

        const priceTotal = configs.value;
        const installments = configs.installments;
        let parcel = (priceTotal / installments).toFixed(2);
        
        let formatedParcel = helpers.convertPrice({ valor: Number(parcel) });
        
        return {
            installments : installments,
            price: formatedParcel            
        };

    },
    removeArr : function (arr, position) {
        let arrA = arr.slice(0, position);
        let arrB = arr.slice(position+1, arr.length);
        return [...arrA, ...arrB];
    },
    cookies : {
        set: function (name, value, exdays) {
            let date = new Date();
            date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));

            let expires = "expires=" + date.toGMTString();
            document.cookie = name + "=" + value + "; " + expires;
        },
        get: function (_name) {
            let name = _name + "=";
            let ca = document.cookie.split(';');

            for (let i = 0; i < ca.length; i++) {

                let c = ca[i];

                while (c.charAt(0) == ' ') c = c.substring(1);

                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }

            }
            return "";
        }
    }

}