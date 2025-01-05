import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  const history = useHistory();
  const addToCartHandler = () => {
    history.push(`/cart/${product._id}?qty=${1}`);
  };

  return (
    <div className="cafe-product-card">
      <div className="cafe-product-image">
        <Link to={`/product/${product._id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
        {product.countInStock === 0 && (
          <span className="sold-out-badge">Sold Out</span>
        )}
        <div className="quick-view-btn">
          <Link to={`/product/${product._id}`}>
            <i className="fas fa-eye"></i>
          </Link>
        </div>
      </div>

      <div className="cafe-product-info">
        <div className="product-header">
          <Link to={`/product/${product._id}`}>
            <h3 className="product-name">{product.name}</h3>
          </Link>
          <p className="brand-name">by {product.brand}</p>
        </div>
        
        <div className="product-details">
          <div className="rating-container">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>

          <div className="price-cart">
            <div className="price-box">
              <span className="price">₹{product.price}</span>
              {product.countInStock > 0 && (
                <span className="stock-status">In Stock</span>
              )}
            </div>
            <button
              onClick={addToCartHandler}
              className="add-to-cart-btn"
              disabled={product.countInStock === 0}
            >
              {product.countInStock !== 0 ? (
                <>
                  <i className="fas fa-shopping-bag"></i>
                  <span>Add to Cart</span>
                </>
              ) : (
                'Sold Out'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
