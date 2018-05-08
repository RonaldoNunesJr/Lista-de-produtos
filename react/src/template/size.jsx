import React, { Component } from 'react'

export default class Size extends Component {
    renderSize() {
        return this.props.available.map((size, idx) => (
            <li key={idx.toString()}>{size}</li>
        ))
    }
    render () {
        return <ul className='size'>
                    {this.renderSize()}
                </ul>
    }
}
