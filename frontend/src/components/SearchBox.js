import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search-form">
      <div className="search-input-group">
        <Form.Control
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search for coffee, pastries..."
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </Form>
  );
};

export default SearchBox;
