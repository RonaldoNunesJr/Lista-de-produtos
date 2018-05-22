import React, { Component } from 'react'

export class ImgAndTitle extends Component {
    render() {
        return (
            <div>
                <img src={this.props.img} />
                <h2>{this.props.title} <small>{this.props.small}</small></h2>
            </div>
        )
    }
}

export class Size extends Component {
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

export class Price extends Component {
    
    addDot (value) {

        if ( value.length < 7 ) {
            return value.replace('.', ',')
        } else {

            const splitValue = value.toString().split('.');
            const valueInverted = splitValue[0].split('').reverse().join('');
            const contValue = valueInverted.length;
            let newValue = valueInverted.split(/([0-9]{3})/).filter(item => {
                if ( item !== '' ) {
                    return item
                }
            }).reverse().join('.')
            

            return `${newValue}, ${splitValue[1]}`
        }

    }

    render() {
        const value = this.props.value
        const installments = this.props.installments
        const isFreeShipping = this.props.isFreeShipping
        const currencyId = this.props.currencyId

        return (
            <div className='price'>
                {console.log(value)}
                R$ <b>{this.addDot(value)}</b>
            </div>
        )
    }
}

