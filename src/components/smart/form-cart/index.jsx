import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class FormCart extends Component {
	state = {
		name: '',
		address: '',
		phone: ''
	}

	onChangeName = (event) => {
		const newState = {...this.state}
		newState.name = event.target.value
		this.setState(newState)
		this.props.onChange(newState)
	}

	onChangeAddress = (event) => {
		const newState = {...this.state}
		newState.address = event.target.value
		this.setState(newState)
		this.props.onChange(newState)
	}

	onChangePhone = (event) => {
		const newState = {...this.state}
		newState.phone = event.target.value
		this.setState(newState)
		this.props.onChange(newState)
	}

	render () {
		return (
			<form>
				<div className="form-group">
					<h4>Datos de envío</h4>
				</div>
				<div className="form-group">
					<label>Tu Nombre</label>
					<input 
						className="form-control" 
						type="text" 
						placeholder="destinatario del envío"
						value={this.state.name}
						onChange={this.onChangeName} />
				</div>
				<div className="form-group">
					<label>Dirección</label>
					<input 
						className="form-control" 
						type="text" 
						placeholder="dirección del envio"
						value={this.state.address}
						onChange={this.onChangeAddress} />
				</div>
				<div className="form-group">
					<label>Teléfono</label>
					<input 
						className="form-control" 
						type="text" 
						placeholder="contacto del destinatario"
						value={this.state.phone}
						onChange={this.onChangePhone} />
					
				</div>
			</form>
		)
	}
}

FormCart.propTypes = {
	onChange: PropTypes.func
}

FormCart.defaultProps = {
	onChange: () => {}
}