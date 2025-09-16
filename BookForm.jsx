


import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post('http://localhost:8080/upload', formData);
      setImageUrl(response.data.url);
    }

    const bookData = { title, author, price: parseFloat(price), imageUrl };
    await axios.post('http://localhost:8080/books', bookData);
    // Reset form fields
    setTitle('');
    setAuthor('');
    setPrice('');
    setImage(null);
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <input type="file" onChange={handleImageChange} required />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;