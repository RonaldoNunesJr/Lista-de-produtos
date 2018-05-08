import React from 'react'

import PageHeader from '../template/pageHeader'
import ProductForm from './productForm'
import ProductList from './productList'

export default props => (
    <div>
        <PageHeader name='Lista de produtos' small='Corinthians'></PageHeader>
        <ProductList />
    </div>

)