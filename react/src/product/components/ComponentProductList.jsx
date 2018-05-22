import React, { Component } from 'react'

export class ImgAndTitle extends Component {
    render() {
        return (
            <div>
                <a href="javascript:;"><img src={this.props.img} /></a>
                <p className="description"><a href="javascript:;">{this.props.title} <small>{this.props.small}</small></a></p>
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
    
    addDot (value, callback) {
        if ( value.toFixed(2).toString().length < 7 ) {
            let valueSplit = value.toFixed(2).split('.');
            return [valueSplit[0], valueSplit[1]]
        } else {
            const factionalPart = value.toFixed(2).toString().split('.');
            const valueInverted = factionalPart[0].split('').reverse().join('');
            const contValue = valueInverted.length;
            let integerPart = valueInverted.split(/([0-9]{3})/).filter(item => {
                if ( item !== '' ) {
                    return item
                }
            }).reverse().join('.')
            return [integerPart, factionalPart[1]]
        }

    }

    installmentsValue (values, valueFormatted) {
        
        console.log('valueFormatted', valueFormatted)
        let installmentsValue = [0, 0];
        if ( values.installments > 0 ) {
            installmentsValue = this.addDot(values.totalValue / values.installments)
        }

        if ( valueFormatted ) {
            
            installmentsValue = `R$ ${installmentsValue[0]},${installmentsValue[1]}`
            return {
                installmentsValue: installmentsValue,
                installments: values.installments
            }
        } else {
            return {
                installmentsValue: {
                    integerPart: installmentsValue[0],
                    factionalPart: installmentsValue[1]
                },
                installments: values.installments
            }
        } 
    }

    render() {
        const value = this.props.value
        const installments = this.props.installments
        const installmentsValue = this.installmentsValue({
            totalValue:value,
            installments: installments
        }, true);
        console.log('installmentsValue: ', installmentsValue)
        const isFreeShipping = this.props.isFreeShipping
        const currencyId = this.props.currencyId
        const newValue = this.addDot(value)

        function classeInstallment (installments) {
            if ( installments > 0 ) {
                return 'installments'
            } else {
                return 'hidden'
            }
        }

        return (
            <section className="box-price">
                <div className="price">
                    <a href="javascript:;">R$ <b>{newValue[0]}</b>,{newValue[1]}</a>
                </div>
                <div className={classeInstallment(installments)}>
                    <a href="javascript:;">
                        ou {installmentsValue.installments} X <em>{installmentsValue.installmentsValue}</em>
                    </a>
                </div>
            </section>
        )
    }
}

