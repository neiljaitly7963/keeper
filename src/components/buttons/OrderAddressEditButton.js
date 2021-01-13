import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getAddressFromOrder } from '../../utility/address'
import { Button } from 'react-bootstrap'
import OrderAddressEditModal from '../modals/OrderAddressEditModal'
import SetChangeAddressText from '../spans/SetChangeAddressText'

class OrderAddressEditButton extends Component {
  state = {
    modalShown: false
  }
  
  closeModal () {
    this.setState({ modalShown: false })
  }
  
  render () {
    const { order, isBilling } = this.props
    const { modalShown } = this.state
    
    // Get the correct address
    const address = getAddressFromOrder(order, isBilling)
    
    return (
      <div>
        <Button onClick={() => this.setState({ modalShown: true })} variant='link'>
          <SetChangeAddressText isBilling={isBilling}/>
        </Button>
        <OrderAddressEditModal modalShown={modalShown} isBilling={isBilling} address={address} closeModal={() => this.closeModal()}/>
      </div>
    )
  }
}

OrderAddressEditButton.propTypes = {
  order: PropTypes.object.isRequired,
  isBilling: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    order: state.getOrder.data,
  }
}

export default connect(mapStateToProps)(OrderAddressEditButton)
