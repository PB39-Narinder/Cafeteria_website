import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  listSellerProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || (!userInfo.isAdmin && !userInfo.isAdminSeller)) {
      history.push('/login');
    }

    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
    } else {
      if (userInfo.isAdminSeller) {
        dispatch(listSellerProducts('', pageNumber));
      } else dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className="product-list-screen">
      <Container>
        <div className="product-list-header">
          <h1>{userInfo.isAdminSeller ? 'My Menu Items' : 'Menu Management'}</h1>
          <button className="create-product-btn" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Add New Item
          </button>
        </div>

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products.length === 0 ? (
          <div className="empty-products">
            <i className="fas fa-coffee"></i>
            <p>No items in your menu yet</p>
            <Link to="/" className="back-link">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.price}</p>
                    <p className="category">{product.category}</p>
                    <p className="brand">{product.brand}</p>
                  </div>
                  <div className="product-actions">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="edit-btn"
                    >
                      <i className="fas fa-edit"></i>
                      Edit
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Paginate pages={pages} page={page} isAdmin={true} />
          </>
        )}
      </Container>
    </div>
  );
};

export default ProductListScreen;
