import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'



const ProductScreen = ({ match }) => {
    const [product,setProduct] = useState([])

    useEffect(()=>{
        const fetchProduct =async ()=>{
            const {data} = await axios.get(`/api/products/${match.params.id}`) 
            setProduct(data)
        }
        fetchProduct()
    },[match])
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
        </Link>

            <Row>
                <Col md={6}>
                    <Image width={'100%'} height={'100%'}  src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>{product.name}</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description: {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup Varient='flush'>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong> ${product.price} </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                               </Col>

                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                                <Button className='btn-block'style={{margin:10}} type='button' disabled={product.countInStock === 0}>
                                    Add To Cart
                                </Button>   
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
