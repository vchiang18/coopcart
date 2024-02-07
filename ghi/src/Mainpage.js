import React, { useState } from 'react';
import "./mainpage.css";
import { useNavigate } from 'react-router-dom';
    

const MainPage = () => {
  const [images] = useState([
    { src: 'https://images.unsplash.com/photo-1614707585284-9cb9fc018387?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxNN2gweE1SbzJUVXx8ZW58MHx8fHx8' }, 
    { src: 'https://images.unsplash.com/photo-1622943495354-f49d2964094c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxNN2gweE1SbzJUVXx8ZW58MHx8fHx8' },
    { src: 'https://images.unsplash.com/photo-1525026198548-4baa812f1183?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3xNN2gweE1SbzJUVXx8ZW58MHx8fHx8' },
    { src: 'https://plus.unsplash.com/premium_photo-1686981905837-c0eabee62bd1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXxNN2gweE1SbzJUVXx8ZW58MHx8fHx8'},
    { src: 'https://images.unsplash.com/photo-1517093911940-08cb5b3952e7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHxNN2gweE1SbzJUVXx8ZW58MHx8fHx8'},
    { src: 'https://images.unsplash.com/photo-1614713946694-bcbd63bfb094?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXxNN2gweE1SbzJUVXx8ZW58MHx8fHx8'},
    { src: 'https://images.unsplash.com/photo-1552010099-5dc86fcfaa38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTJ8TTdoMHhNUm8yVFV8fGVufDB8fHx8fA%3D%3D'},
    { src: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTB8TTdoMHhNUm8yVFV8fGVufDB8fHx8fA%3D%3D'},
    { src: 'https://images.unsplash.com/photo-1504472685735-9bd4075b3779?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTF8TTdoMHhNUm8yVFV8fGVufDB8fHx8fA%3D%3D'},
    { src: 'https://plus.unsplash.com/premium_photo-1678344151150-4a42c45453d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NnxNN2gweE1SbzJUVXx8ZW58MHx8fHx8'}
  ]);
    const navigate = useNavigate();

    const handleSignin = () => {
        navigate('../signin/'); };
    
    const handleSignup = () => {
        navigate('../signup/'); };

  return (
    <div className="mainpage-center">    
        <header className="mainpage-header">
            <h1 className= 'mainpage-title'>Coopcart</h1>
        <div className="mainpage-btns">
            <button onClick={handleSignin} className="mainpage-button loginBtn">Login</button>
            <button onClick={handleSignup} className="mainpage-button signupBtn">Signup</button>
        </div>
        </header>
        <div style={{ height: '80px' }}></div>
        <h1 className="mainpage-title">Welcome to CoopCart</h1>
        <h2 className="mainpage-sub_title">Your cooperative shopping solution</h2>
        <div className="mainpage-image-container">
            {images.map((image, index) => (
                <img key={index} src={image.src} alt={`Content ${index}`} />
            ))}
        </div>
        <footer className="mainpage-footer">
        <div className="mainpage-footer-content">
          <div className="mainpage-footer-section">
            <h4>CoopCart</h4>
            <ul>
              <li>Join Us!</li>
            </ul>
          </div>
          <div className="mainpage-footer-section">
            <h4>Terms</h4>
            <ul>
              <li>Terms&Condition</li>
            </ul>
          </div>
          <div className="mainpage-footer-section">
            <h4>Contact Us</h4>
            <p>(213)-123-1234</p>
          </div>
        </div>
        <div className="mainpage-footer-bottom">
          <p>2024, CoopCart Team</p>
          <p>DESIGN BY CoopCart Team</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;


