import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const API_URL = "http://localhost:8000";

function Uploadoc() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Helper to convert file to Base64
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  // Fetch user's images on component mount
  const fetchImages = async () => {
    try {
      // The auth header is automatically added by the context setup
      const response = await axios.get(`${API_URL}/api/user/images`);
      setImages(response.data.images || []);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Fetch images error:', error);
      setMessage('Failed to load existing images.');
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  // Handle the upload process
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
    setIsUploading(true);
    try {
      const base64File = await toBase64(file);
      const payload = { document: base64File };

      // Auth header is handled globally by AuthContext's axios config
      await axios.post(`${API_URL}/api/user/upload`, payload);

      setMessage('File uploaded successfully!');
      setFile(null); // Reset file input
      document.getElementById('file-input').value = null;
      fetchImages(); // Refresh images after upload
    } catch (error) {
      setMessage('An error occurred while uploading the file.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };
  
  const showPreviousImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const showNextImage = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className='container mt-5 p-4 border rounded'>
      <div className='row'>
        {/* Left Side: Uploader */}
        <div className='col-md-6'>
          <h2>Upload New Document</h2>
          <div className="form-group">
            <input id="file-input" type="file" className="form-control-file my-3" onChange={handleFileChange} />
          </div>
          <button onClick={handleUpload} className='btn btn-dark' disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
          {message && <p className="mt-3">{message}</p>}
        </div>

        {/* Right Side: Image Carousel */}
        <div className='col-md-6'>
          {images.length > 0 ? (
            <div className="text-center">
              <h3>Your Saved Documents</h3>
              <img 
                src={images[currentIndex]} 
                alt={`Document ${currentIndex + 1}`} 
                className="img-fluid border rounded"
                style={{ maxHeight: '400px', objectFit: 'contain' }} 
              />
              <div className="mt-3">
                <button onClick={showPreviousImage} className="btn btn-secondary mx-1">Previous</button>
                <button onClick={showNextImage} className="btn btn-secondary mx-1">Next</button>
              </div>
              <p className="mt-2">Document {currentIndex + 1} of {images.length}</p>
            </div>
          ) : (
            <div className="text-center p-5">
              <p>No documents found. Upload one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Uploadoc;