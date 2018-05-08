import React, { Component } from 'react'

export default class Price extends Component {
    render() {
        const value = this.props.value
        const installments = this.props.installments
        const isFreeShipping = this.props.isFreeShipping
        const currencyId = this.props.currencyId

        return (
            <div className='Price'>
                <span className='value'>{value}</span>
                <span className='value'>{value}</span>
            </div>
        )
    }
}
