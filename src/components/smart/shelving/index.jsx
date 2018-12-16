import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button, Row, Col, Container, Form, FormGroup, Input, Breadcrumb, BreadcrumbItem, Collapse } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlatList from '../../dumb/flat-list'
import ItemProduct from '../../dumb/item-product'
import FormFilter from '../form-filter'

import css from './styles.css'

export default class Shelving extends Component {
	state = {
		category: this.props.category,
		products: this.props.products,
		activeCategory: this.props.category,
		activeProducts: this.props.products,
		breadcrumbs: [this.props.category],
		collapse: false
	}

	toggle = () => {
    this.setState({collapse: !this.state.collapse});
  }

	recursivo2 = (categories, categoryId) => {
		let aux = false
		categories.forEach(category => {
			if (category.id === categoryId)
				aux = true
			else if (category.sublevels.length)
				aux = aux || this.recursivo2(category.sublevels, categoryId)
		})
		return aux
	}

	getAllCategoriesId = (category) => {
		let categoriesId = []
		categoriesId.push(category.id)
		categoriesId = categoriesId.concat(this.getSubCategoriesId(category))
		
		return categoriesId
	}

	getSubCategoriesId = (category) => {
		let subCategories = []

		category.sublevels.forEach(subCategory => {
			if (subCategory.sublevels.length) {
				subCategories.push(subCategory.id)
				subCategories = subCategories.concat(this.getSubCategoriesId(subCategory))
			} else {
				subCategories.push(subCategory.id)
			}
		})

		return subCategories
	}

	filterProductsByCategoriesId = (products, categoriesId) => {
		return products.filter(product => categoriesId.includes(product.sublevel_id))
	}

	filterGeneric = (filterParams) => {
		// console.log('hola generico', filterParams)
		// const productsFiltered = this.state.activeProducts.filter((product) => {
		// 	switch (filterParams.availability) {
		// 		case 'available':
		// 			return product.available
		// 		case 'notavailable':
		// 			return !product.available
		// 		default:
		// 			return true
				
		// 	}
		// })
	}

	onClickBreadcrumbs = (breadcrumb, event) => {
		// ESTE CODIGO SE PUEDE REFACTORIZAR PARA QUE QUEDE MAS LIMPIO
		event.preventDefault()
		const { breadcrumbs } = this.state
		const numberBreadcrumbs = breadcrumbs.length
		const indexBreadcrumbTouched = breadcrumbs.indexOf(breadcrumb)

		if (indexBreadcrumbTouched === numberBreadcrumbs -1)
			return

		const updatedBreadcrumbs = breadcrumbs.slice(0, indexBreadcrumbTouched + 1)

		const activeCategory = updatedBreadcrumbs[updatedBreadcrumbs.length - 1]

		const activeProducts = this.filterProductsByCategoriesId(
			this.state.products, this.getAllCategoriesId(activeCategory))

		this.setState({
			breadcrumbs: updatedBreadcrumbs,
			activeCategory,
			activeProducts
		})
	}

	onClickSubCategory = (subCategory) => {
		const activeCategory = subCategory

		const breadcrumbs = this.state.breadcrumbs
		breadcrumbs.push(subCategory)

		const activeProducts = this.filterProductsByCategoriesId(
			this.state.products, this.getAllCategoriesId(activeCategory))

		this.setState({
			activeCategory,
			breadcrumbs,
			activeProducts
		})
	}

	prueba = () => {
		const categoriesId = this.getAllCategoriesId(this.state.activeCategory)
		const aux = this.filterProductsByCategoriesId(this.state.products, categoriesId)
		this.setState({activeProducts: aux})
		console.log('productos filtrados', aux)

	}

	

	render () {
		return (
			<div className="row"> 

			<div className="col-xs-12 col-md-12 col-lg-12">
				<div className="col-xs-8 col-md-8 col-lg-8 nopadding">
						<Col className="p-0" xs={8}>
							<Form>
								<FormGroup className="m-0">
									<Input className="form-control-sm" type="text" placeholder="Buscar producto" />
								</FormGroup>
							</Form>
						</Col>
						
				</div>

				<div className="col-xs-2 col-md-4 col-lg-4">
						<Col className="d-flex flex-row-reverse p-0" xs={4}>
							<Button color="primary ml-1" size="sm" onClick={this.toggle}>
								<FontAwesomeIcon icon="filter" />
							</Button>
						</Col>
					
				
				</div>


				<div className="col-xs-12 col-md-12 col-lg-12">
							<Collapse isOpen={this.state.collapse}>
								<Row>
									<Col xs={12} style={{backgroundColor: ''}}>
										<FormFilter  />
									</Col>
								</Row>
							</Collapse>
				</div>

			</div>

				

				<Container>
					<Row className={css.header}>
						<Col className="p-0 col-md-12 col-lg-12 col-xs-12">
							<Breadcrumb tag="nav">
								<FlatList 
									data={this.state.breadcrumbs}
									renderItem={(breadcrumb, index) => (
										<BreadcrumbItem 
											tag="a" 
											href="#" 
											className="breadcrumb"
											key={index} 
											active={!(index === 0)}
											onClick={(event) => {this.onClickBreadcrumbs(breadcrumb, event)}}
										>
											{breadcrumb.name}
										</BreadcrumbItem>
									)} 
								/>
							</Breadcrumb>
						</Col>
						<div className="col-md-12 col-lg-12 col-xs-12 subcat">
							<div className={css.subcategories + " breadcrumb"}>
								<FlatList 
									data={this.state.activeCategory.sublevels} 
									renderItem={(subCategory, index) => (
										<Button
											color="primary ml-2" 
											size="md" 
											className="col-xs-5 col-md-2 col-lg-2"
											key={index} 
											onClick={() => {this.onClickSubCategory(subCategory)}}
										>
											{subCategory.name}
										</Button>
									)} 
								/>
							</div>
						</div>
					</Row>

					
					<Row className="">
						<div className="p-0">
							<div className="">
								<FlatList 
									data={this.state.activeProducts} 
									renderItem={(product, index) => (
										<div className="col-md-3 col-lg-3 col-xs-12" key={index}>
											<ItemProduct
												product={product}
												onClickAdd={this.props.onAddProduct} />
										</div>
									)} 
								/>
							</div>
						</div>
					</Row>
					
				</Container>
			</div>
		)
	}
}

// Shelving.propTypes = {
// 	msm: PropTypes.string,
// }

// Shelving.defaultProps = {
// 	msm: '¡Bienvenido!',
// }
