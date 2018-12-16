import React from 'react'
import PropTypes from 'prop-types'
import { Badge, Button} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import css from './styles.css'

const Header = ({ title, itemsCount, isOpen, onClickBtnShoppingCart }) => (
	<div fixed="top" color="light">
    
		<div className="cart-container-fixed">
		<div className="ml-auto nav nav-pills">
      <div>
				<Button className={css + " active"} onClick={onClickBtnShoppingCart}>
					<FontAwesomeIcon icon={isOpen ? 'times' : 'shopping-cart'} />
					{ !isOpen && <Badge className="ml-3" color="danger">{itemsCount}</Badge> }
				</Button>
      </div>
    </div> 
		</div>
       
  </div>
)

Header.propTypes = {
	title: PropTypes.string,
	itemsCount: PropTypes.number,
	isOpen: PropTypes.bool,
	onClickBtnShoppingCart: PropTypes.func
}

Header.defaultProps = {
	title: '',
	itemsCount: 0,
	isOpen: false,
	onClickBtnShoppingCart: () => {}
}

export default Header
