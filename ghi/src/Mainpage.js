// import React from 'react';
// import "./mainpage.css"


// const MainContent = () => {
//   return (
//     <div className="center">
//       <div className="title">Welcome to CoopCart</div>
//       <div className="sub_title">Your cooperative shopping solution</div>
//       <div className="btns">
//         <button className="loginBtn" onClick={() => console.log('Login Clicked')}>Login</button>
//         <button className="signupBtn" onClick={() => console.log('Signup Clicked')}>Signup</button>
//       </div>
//     </div>
//   );
// };

// export default MainContent;


import React, { useState, useEffect } from 'react';
import "./mainpage.css";

const MainContent = () => {
  const [images, setImages] = useState([
    { src: 'url1.jpg', x: 0, y: 0 }, 
    { src: 'url2.jpg', x: 0, y: 0 },
    { src: 'url3.jpg', x: 0, y: 0 },
  ]);

  useEffect(() => {
    const updateImagePositions = () => {
      setImages((currentImages) =>
        currentImages.map((image) => ({
          ...image,
          x: Math.random() * 300, // Example calculation for x position
          y: Math.random() * 300, // Example calculation for y position
        }))
      );
    };

    updateImagePositions();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="center">
      <div className="title">Welcome to CoopCart</div>
      <div className="sub_title">Your cooperative shopping solution</div>
      <div className="image-container" style={{ position: 'relative', width: '100%', height: '500px' }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={`Random Img ${index}`}
            style={{
              position: 'absolute',
              left: `${image.x}px`,
              top: `${image.y}px`,
            }}
          />
        ))}
      </div>
      <div className="btns">
        <button className="loginBtn" onClick={() => console.log('Login Clicked')}>Login</button>
        <button className="signupBtn" onClick={() => console.log('Signup Clicked')}>Signup</button>
      </div>
    </div>
  );
};

export default MainContent;
