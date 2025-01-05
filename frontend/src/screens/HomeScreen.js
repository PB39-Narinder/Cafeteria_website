import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';
import Services from '../components/Services';
import About from '../components/About';
import Contact from '../components/Contact';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const [isBackendDown, setIsBackendDown] = useState(false);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products = [], page = 1, pages = 1 } = productList;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await dispatch(listProducts(keyword, pageNumber));
        setIsBackendDown(false);
      } catch (err) {
        if (err.message.includes('ECONNREFUSED')) {
          setIsBackendDown(true);
        }
      }
    };
    loadProducts();
  }, [dispatch, keyword, pageNumber]);

  if (isBackendDown) {
    return (
      <div className="server-down-screen">
        <Container>
          <div className="server-down-content">
            <div className="server-icon">
              <i className="fas fa-server"></i>
            </div>
            <h2>Server Connection Error</h2>
            <p>We're unable to connect to the server at the moment.</p>
            <div className="action-buttons">
              <button 
                className="refresh-btn"
                onClick={() => window.location.reload()}
              >
                <i className="fas fa-sync-alt"></i> Refresh Page
              </button>
              <Link to="/" className="home-btn">
                <i className="fas fa-home"></i> Go to Home
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <Meta />
      <section className="hero-section">
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Container>
            <Link to="/" className="back-btn">
              <i className="fas fa-arrow-left"></i>
              Return to Menu
            </Link>
          </Container>
        )}
      </section>

      <section className="menu-section">
        <Container>
          <div className="section-header">
            <h1>Our Menu</h1>
            <p>Discover our handcrafted coffee and delicious treats</p>
          </div>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product._id} className="product-item">
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <div className="pagination-wrapper">
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                />
              </div>
            </>
          )}
        </Container>
      </section>

      {!keyword && (
        <>
          <Services />
          <About />
          <Contact />
        </>
      )}
    </>
  );
};

export default HomeScreen;
