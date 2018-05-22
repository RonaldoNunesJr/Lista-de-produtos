import axios from 'axios'

export function getInfo (callback) {

    return axios.get('http://api.promasters.net.br/cotacao/v1/valores?alt=json').then(function (response) {
        if ( response.data.status === true ) {
            console.log(response.data.valores)
            callback(response.data.valores)
        } else {
            throw error ('Não foi possivel retornar os valores.');
        }
    }).catch(function (error) {
        console.log('Error: ', error);
    });
    
}
