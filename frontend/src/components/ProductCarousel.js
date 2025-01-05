import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="cafe-carousel-wrapper">
      <h2 className="carousel-heading">Featured Items</h2>
      <Carousel 
        pause="hover" 
        className="cafe-carousel"
        indicators={true}
        interval={4000}
      >
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <div className="cafe-carousel-content">
              <div className="cafe-carousel-image">
                <Image
                  src={product.image}
                  alt={product.name}
                  fluid
                />
              </div>
              <div className="cafe-carousel-details">
                <h3>{product.name}</h3>
                <p className="cafe-description">{product.description}</p>
                <div className="cafe-price-rating">
                  <span className="cafe-price">₹{product.price}</span>
                  <div className="cafe-rating">
                    <i className="fas fa-coffee"></i>
                    <span>{product.rating}/5</span>
                  </div>
                </div>
                <Link 
                  to={`/product/${product._id}`}
                  className="cafe-btn"
                >
                  Order Now
                </Link>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
