

import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
 
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'Testing_Cloudinary_for_Books'); //Cloudinary upload preset
    formData.append('folder', 'books'); //the particular Cloudinary folder

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dtam0kqa6/image/upload`, // my Cloud Name
        formData
      );
      const uploadedImageUrl = response.data.secure_url;
      setImageUrl(uploadedImageUrl);
      console.log('Image uploaded successfully:', uploadedImageUrl);

      const bookData = {
        title,
        author,
        price: parseFloat(price),
        imageUrl: uploadedImageUrl,
      };

      await axios.post('http://localhost:8080/books', bookData);
      console.log('Book data saved successfully');

      setTitle('');
      setAuthor('');
      setPrice('');
      setImage(null);
      setImageUrl('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Upload Image to Cloudinary</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} required />
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
        <button type="submit">Upload</button>
      </form>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px' }} />
        </div>
      )}
    </div>
  );
};
export default ImageUpload;
