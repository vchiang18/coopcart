import React, { useState, useEffect, useRef} from 'react';
import "./mainpage.css";

const MainContent = () => {
    const [images,setImages] = useState([
        { src: 'https://images.unsplash.com/photo-1614707585284-9cb9fc018387?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxNN2gweE1SbzJUVXx8ZW58MHx8fHx8'}, 
        { src: 'https://images.unsplash.com/photo-1622943495354-f49d2964094c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxNN2gweE1SbzJUVXx8ZW58MHx8fHx8'},
        { src: 'https://images.unsplash.com/photo-1525026198548-4baa812f1183?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xNN2gweE1SbzJUVXx8ZW58MHx8fHx8'},
    ]);
    const imageContainerRef = useRef();
    const getRandomPosition = (dimension, containerDimension) => {
        const max=containerDimension - dimension;
        return Math.floor(Math.random()* max ); }

    useEffect(()=> {
        const container = imageContainerRef.current;
        if (container) {
            const containerRect = container.getBoundingClientRect();

            setImages(images.map(image => {
                const newPosition = {
                    x: getRandomPosition(image.dimensions.width, containerRect.width),
                    y: getRandomPosition(image.dimensions.height, containerRect.height)
                };

            return { ...image, position: newPosition };
      }));
    }
  }, []); 

  return (
    <div className="center">
      <div className="title">Welcome to CoopCart</div>
      <div className="sub_title">Your cooperative shopping solution</div>
      <div className="image-container" >
        {images.map((image, index) => (
            <img key={index} src={image.src} alt={`Content ${index}`} />
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
