import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/product.action'

import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'


const Homescreen = () => {

    const dispatch = useDispatch()

    //* productList from redux store reducer
    const productList = useSelector(state => state.productList)
    let { loading, products, error } = productList


 

    //* bring userLogin state with useSelector
    const userInfo = useSelector((state) => state.userLogin)
    let { message } = userInfo
  

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])



    return (
        <>
             {message && <Message> {message} </Message>}
            <h1>Latest Product</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row>
                {products.map(item =>
                    <Col key={item.product_id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={item} />
                    </Col>
                )}
            </Row>}
        </>
    )
}

export default Homescreen
