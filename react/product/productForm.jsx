import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'

import { } from './productsActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this)
    
    }

    componentWillMount() {
      //  this.props.search();
    }

    /* keyHandler(e) {
        const { add, clear, search, description } = this.props

        if (e.key === 'Enter') {
            e.shiftKey ? search() : add(description)
        } else if (e.key === 'Escape') {
            clear()
        }
    } */
    
    render() {
        

        return (
            <div role='form' className='todoForm'>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
//const mapDispatchToProps = dispatch => bindActionCreators(null, dispatch)
export default connect(mapStateToProps)(TodoForm)