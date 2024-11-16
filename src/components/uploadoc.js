import React, { useState, useEffect } from 'react';

function Uploadoc() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);  // List of images
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for image display

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const token = localStorage.getItem("jwt");
    if (!token) {
      setMessage('User not authenticated.');
      return;
    }

    try {
      const base64File = await fileToBase64(file);
      const payload = {
        document: base64File,
        filename: file.name,
      };

      const response = await fetch('https://mediflex.onrender.com/api/user/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('File uploaded successfully!');
        fetchImages();  // Refresh images after upload
      } else {
        const errorData = await response.json();
        setMessage(`Failed to upload file: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      setMessage('An error occurred while uploading the file.');
      console.error('Upload error:', error);
    }
  };

  // Fetch all images of the user
  const fetchImages = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    try {
      const response = await fetch('https://mediflex.onrender.com/api/user/images', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setImages(data.images || []);  // Assuming response is { images: [...] }
        setCurrentIndex(0);  // Reset to first image
      } else {
        setMessage('Failed to load images.');
      }
    } catch (error) {
      setMessage('An error occurred while fetching images.');
      console.error('Fetch images error:', error);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  // Navigate to previous image
  const showPreviousImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
  };

  // Navigate to next image
  const showNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className='container d-flex justify-content-between align-items-center mt-5'>
    <div className='leftside'>

      <h2>Upload Document</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className='btn btn-dark'>Upload</button>
      {message && <p>{message}</p>}
    </div>

      {/* Image Carousel */}
      <div className='rightside'>
      {images.length > 0 && (
        <div>
          <h3>Saved Images</h3>
          <img src={images[currentIndex]} alt={`Saved ${currentIndex + 1}`} style={{ width: '500px', height: 'auto' }} />
          <div>
            <button onClick={showPreviousImage}>Previous</button>
            <button onClick={showNextImage}>Next</button>
          </div>
          <p>Image {currentIndex + 1} of {images.length}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default Uploadoc;
