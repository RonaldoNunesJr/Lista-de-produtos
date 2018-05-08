import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { add, remove } from './productsActions'
import Grid from '../template/grid'
import Size from '../template/size'
import Price from '../template/price'
import Ajax from '../template/ajax'

const ProductList = props => {
    
    const url = (id) => (require(`../image/products/img${id+1}.jpg`))
    const renderProducts = () => {
        const list = props.list || []
        
        Ajax(function(resolved){
            console.log('resolved', resolved)
        });
        
        return list.map((product, idx) => (
            <Grid valueKey={idx} cols='12 6 3'>
                <img src={url(product.id)} />
                <h2>{product.title} <small>{product.style}</small></h2>
                <Size available={product.availableSizes} />
                <Price value={product.price} installments={product.installments} isFreeShipping={product.isFreeShipping} currencyId={product.currencyId} />
            </Grid>
        ))
        
    }

    return (
        <ul>
            {renderProducts()}
        </ul>        
    )
}

const mapStateToProps = state => ({list: state.list.list})
const mapDispatchToProps = dispatch => bindActionCreators({ add, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
// Padrão de projetos chamado decoration