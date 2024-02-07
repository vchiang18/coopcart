import React, { useState } from 'react';
import "./mainpage.css";

const MainContent = () => {
  const [images] = useState([
    { src: 'https://images.unsplash.com/photo-1614707585284-9cb9fc018387?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxNN2gweE1SbzJUVXx8ZW58MHx8fHx8' }, 
    { src: 'https://images.unsplash.com/photo-1622943495354-f49d2964094c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxNN2gweE1SbzJUVXx8ZW58MHx8fHx8' },
    { src: 'https://images.unsplash.com/photo-1525026198548-4baa812f1183?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xNN2gweE1SbzJUVXx8ZW58MHx8fHx8' }
  ]);

  return (
    <div className="center">
      <div className="btns">
        <button className="button loginBtn">Login</button>
        <button className="button signupBtn">Signup</button>
      </div>
      <h1 className="title">Welcome to CoopCart</h1>
      <h2 className="sub_title">Your cooperative shopping solution</h2>
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={`Content ${index}`} />
        ))}
      </div>
    </div>
  );
};

export default MainContent;
