import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Container } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
    }
  }, [dispatch, match, product._id, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }

  return (
    <div className="product-details-screen">
      <Container>
        <Link to="/" className="back-link">
          <i className="fas fa-arrow-left"></i> Back to Products
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <div className="product-details-content">
              <Row>
                <Col lg={6}>
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-meta">
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                      <div className="product-brand">
                        <span>Brand:</span> {product.brand}
                      </div>
                    </div>

                    <div className="product-description">
                      <h3>Description</h3>
                      <p>{product.description}</p>
                    </div>

                    <div className="purchase-section">
                      <div className="price-stock">
                        <div className="price">
                          <span>Price:</span>
                          <h2>₹{product.price}</h2>
                        </div>
                        <div className="stock-status">
                          <span>Status:</span>
                          {product.countInStock >= 5 ? (
                            <span className="in-stock">In Stock</span>
                          ) : product.countInStock > 0 ? (
                            <span className="low-stock">Only {product.countInStock} left!</span>
                          ) : (
                            <span className="out-stock">Out of Stock</span>
                          )}
                        </div>
                      </div>

                      {product.countInStock > 0 && (
                        <div className="quantity-selector">
                          <span>Quantity:</span>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </div>
                      )}

                      <button
                        onClick={addToCartHandler}
                        className="add-to-cart-btn"
                        disabled={product.countInStock === 0}
                      >
                        <i className="fas fa-shopping-cart"></i>
                        {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="reviews-section">
                <Col md={6}>
                  <div className="reviews-container">
                    <h2>Customer Reviews</h2>
                    {product.reviews.length === 0 ? (
                      <Message>No Reviews Yet</Message>
                    ) : (
                      <div className="reviews-list">
                        {product.reviews.map((review) => (
                          <div key={review._id} className="review-item">
                            <div className="review-header">
                              <strong>{review.name}</strong>
                              <Rating value={review.rating} />
                            </div>
                            <p className="review-date">
                              {review.createdAt.substring(0, 10)}
                            </p>
                            <p className="review-comment">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="write-review">
                      <h3>Write a Review</h3>
                      {successProductReview && (
                        <Message variant="success">Review submitted successfully</Message>
                      )}
                      {loadingProductReview && <Loader />}
                      {errorProductReview && (
                        <Message variant="danger">{errorProductReview}</Message>
                      )}
                      {userInfo ? (
                        <Form onSubmit={submitHandler} className="review-form">
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group controlId="comment">
                            <Form.Label>Your Review</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={4}
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Share your thoughts about this product..."
                            />
                          </Form.Group>

                          <button type="submit" className="submit-review-btn">
                            Submit Review
                          </button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a review
                        </Message>
                      )}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Container>
    </div>
  )
}

export default ProductScreen
