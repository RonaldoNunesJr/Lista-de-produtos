import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import IconButton from '../template/iconButton'
import { add, remove } from './productsActions'

const TodoList = props => {
    const url = (id) => (require(`../image/products/img${id+1}.jpg`))

    const renderProducts = () => {
        const list = props.list || []
        
        return list.map(product => (
            
            <li key={product.id}>
                <img src={url(product.id)} />
                <h2>{product.title}</h2>
            </li>
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
export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
// Padrão de projetos chamado decoration