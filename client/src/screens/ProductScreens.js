import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/product.action'

import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProductScreens = ({ history, match }) => {

    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    //* productDetails from redux store reducer
    const productDetails = useSelector(state => state.productDetails)
    const { loading, product, error } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))

    }, [dispatch, match])

const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
}

    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :

                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={3}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating
                                    value={product.rating}
                                    text={`${product.numreviews} reviews`}
                                />
                            </ListGroup.Item>
                            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countinstock > 0 ? 'In Stock' : 'Out Of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>


                                {product.countinstock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control
                                                    as='select'
                                                    value={qty}
                                                    onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {/* //* create dropdown from 0 to count in stock */}
                                                    {/* //* first is convert to Array, spread , and get the keys(index) with keys() */ }
                                                    {[...Array(product.countinstock).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    )
                                                )}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}


                                <ListGroup.Item>
                                    <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock === 0}>
                                        Add To Cart
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            }

        </>
    )
}

export default ProductScreens
