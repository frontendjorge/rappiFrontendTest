import React from 'react'
import PropTypes from 'prop-types'
import css from './styles.css'

const ItemProduct = ({ product, imgsrc, onClickAdd }) => (
	<div className="col-md-12 col-lg-12 col-xs-12">
		<div className="card">
		<div className="img-product card-image"><img className="card-img-top img-responsive" src={imgsrc} alt={product.name} /></div>
		<div className="card-body">
		<div className={css.label}>
			
			<small>{product.available ? 'DISPONIBLE': 'NO DISPONIBLE'}</small>
			<div className="label label-default">
				<strong>{product.price}</strong>
			</div>
		</div>
		<div className={css.info}>
			<p>
				<strong>{product.name}</strong><br />
				<small>{product.quantity} Unds. en stock</small><br />
				<br />
				<button 
					className="btn btn-primary btn-sm"
					type="button"  
					onClick={() => {onClickAdd(product)}}
					disabled={!product.available}>
					Agregar al carrito
				</button>
			</p>
		</div>
		</div>
		
	</div>
	</div>
	
)

ItemProduct.propTypes = {
	product: PropTypes.object.isRequired,
	onClickAdd: PropTypes.func,
	imgsrc: PropTypes.string,
}

ItemProduct.defaultProps = {
	onClickAdd: () => {},
	imgsrc: 'https://via.placeholder.com/600x300',
}

export default ItemProduct
