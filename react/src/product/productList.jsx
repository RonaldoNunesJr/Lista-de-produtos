import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { add, remove } from './productsActions'
import Grid from '../template/grid'

/*import ImgAndTitle from './components/imgAndTitle'
import Size from './components/size'
import Price from './components/price'*/
import { ImgAndTitle, Size, Price } from './components/ComponentProductList'
import { getInfo } from '../template/ajax'



const ProductList = class ProductList extends Component {

    /*componentDidMount(){
        console.log("didMount");     
    
        getInfo(function(resolved){
            this.setState = ({lista:resolved});
        });
    }*/

    url(id) {
        return require(`../image/products/img${id+1}.jpg`)
    }

    renderProducts () {
        const list = this.props.list || []
        
        /*<Size available={product.availableSizes} />*/
        return list.map((product, idx) => (
            <Grid _key={idx.toString()} cols='12 6 3'>
                <ImgAndTitle img={this.url(product.id)} title={product.title} small={product.style} />
                <Price value={product.price} installments={product.installments} isFreeShipping={product.isFreeShipping} currencyId={product.currencyId} />
            </Grid>
        ))
    }
    render() {     
        return (
            <ul>
                {this.renderProducts()}
            </ul>        
        )
    }    

}

const mapStateToProps = state => ({list: state.list.list})
const mapDispatchToProps = dispatch => bindActionCreators({ add, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
// Padrão de projeto's chamado decoration