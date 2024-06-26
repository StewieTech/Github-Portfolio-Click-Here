// import a react component that inputs a textarea message then performs a fetch request to localhost:3001 gets back a respnse as a data.message and displays that message in a box below 
import logo from './logo.svg';
import React, { useState} from 'react';
import './App.css';
// import { Container } from 'react-bootstrap';
// import {Container, Row, Col, Form, Button, Modal, Badge } from 'react-bootstrap';
import { View, Text, TextInput, Button, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { FiCamera, FiArrowRight } from 'react-icons/fi';// Import icons from react-icons library
// import { FiArrowRight } from 'react-icons/fi';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-com';

import Tesseract from 'tesseract.js'
// import Dropzone from 'react-dropzone';
// import Login from './components/Login';

// Components
import Header from './components/Header';

// import Response from './components/Response';
// import ProUpgradeModal from './components/ProUpgradeModal';

console.log(process.env.REACT_APP_API_URL)
console.log("Hey")

// const pictureList = [ 'lola2.jpeg', 'lola.webp', 'lolac.png', 'lola3.png', 'lola4.png', 'lola5.png' ];
 const pictureList = [ 'lola2.png', 'lola.webp', 'lolac.png', 'lola3.png', 'lola4.png',  'lola6v4.png', 'lola5.png']

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [pictureIndex, setPictureIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const randomTimeout = Math.floor(Math.random() * 2500) + 2500 ;
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [ocrText, setOcrText] = useState('') ;
  var [questionCount, setQuestionCount] = useState(0);
  const [showProPopup, setShowProProPopup] = useState(false);
  // const [isTextareaBlur, setIsTextareaBlur] = useState(false);
  
  const MAX_QUESTION_LIMIT_FREE = 5
  const handleTextareaFocus = () => {
    setIsTextareaFocused(true);
  };
  
  const handleTextareaBlur = () => {
    setIsTextareaFocused(false);
  };
  
  if (questionCount >= MAX_QUESTION_LIMIT_FREE) {
    setShowProProPopup(true) ;
    return;
  }


  const handleQuestionSubmit = () => {
    if (questionCount < MAX_QUESTION_LIMIT_FREE) {
      setQuestionCount((prevCount) => prevCount + 1);
    } else {
      setShowProProPopup(true);
    }
  }

  // questionCount = 2

  
  var remainingFreeQuestions = MAX_QUESTION_LIMIT_FREE - questionCount ;


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      Tesseract.recognize(file, 'eng')
      .then(({ data: {text} }) => {
        // const processedText = processTextConversation(text);
        // setMessage(processedText);
 
        setMessage(text);
      })
      .catch((error) => {
        console.error('Error extracting text:',error);
      })
    }
  }

  const handleSignUpForPro = () => {
    setShowProProPopup(false);
  }

  const handleCloseProPopup = () => {
    setShowProProPopup(false);
  };


  const Work = process.env.REACT_APP_API_URL ;
  // const Work = `http://localhost:3003` ; // test

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when the form is submitted
    setPictureIndex((prevIndex) => (prevIndex + 1) % pictureList.length);
    
    setTimeout(() => {

      fetch(Work, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({message}),
      })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          
          
          setResponse(data.message);
          setQuestionCount((prevCount) => prevCount + 1); 
        } else {
          setResponse('Error: No message received');
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        setResponse('Error: Request failed');
      })
      .finally(() => {
        setIsLoading(false); // Set loading back to false when the fetch is complete
      });
      
    }, randomTimeout);
};

// var smiley = ';)'

return (


<View style={styles.container}>

      <Text style={styles.title}>Ask Lola 😉</Text>

    

      <View style={styles.textAreaContainer}>
    {/* Text Area */}

    {/* <Row className="justify-content-center">
      <Col xs={12} sm={8} md={6} lg={4}> */}
      <div className={`textarea-container ${isTextareaFocused ? 'expanded' : ''}`}>


 

       
       
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTextarea">
            <Form.Control
              as="textarea" 
              value={message}
              placeholder="Ask your wingwomen anything ;)"
              onChange={(e) => setMessage(e.target.value)}
              onFocus={handleTextareaFocus}
              onBlur={handleTextareaBlur}
              className={`textarea ${isTextareaFocused ? 'focus' : ''}`}
               />

            {isTextareaFocused ? (
              <FiArrowRight className="icon arrow-icon" />
             ) : (
              <label htmlFor="imageUpload">
                <FiCamera className={`camera-icon ${isTextareaFocused ? 'hidden' : ''}`} />
              </label>
             )}

             {/* hidden input file */}
             <input
             id="imageUpload"
             type="file"
             accept="image/*"
             onChange={handleImageUpload}
             style={{ display: 'none'}}

             />
               
               {/* Pro Badge */}
               <div className="text-center">
                  {remainingFreeQuestions > 0 ? (
                    <Badge variant="secondary">Remaining Free Questions: {remainingFreeQuestions}</Badge>
                  ) : (
                    <Badge variant="danger">Upgrade to Pro for Unlimited Questions</Badge>
                  )}
                </div>

          {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
          </Form.Group>
          <Button variant="primary" type="submit" block>
            Send Message 💜 
          </Button>
        </Form>
      </div>
 

    </View>

    //  Lola's Response 

    <View style={styles.responseContainer}>
   

    <Row className="justify-content-center mt-3">
      <Col xs={12} sm={8} md={6} lg={4}>
      {isLoading ? (
        <h2 className="flashyDots"> . </h2> //Show flashy dots while loading
      ) : response && (
        <div className = "animatedResponse">
        <h2>{response}</h2> {/* Show the animated response when not loading */}
        </div>
      )}
      </Col>
    </Row>

    </View>
    


    <Row className="justify-content-center mt-3">
      <Col xs={12} sm={8} md={6} lg={4}>
        <img src={pictureList[pictureIndex]} alt="Person" className="person-image img-fluid" />
      </Col>
    </Row>

    <Row className="justify-content-center mt-3">
      <Col xs={12} sm={8} md={6} lg={4}>
        <img src={logo} className="App-logo" alt="logo" />
      </Col>
    </Row>


    <Row className="justify-content-center mt-3">
      <Col xs={12} sm={8} md={6} lg={4}  className="text-center">
        <p>
          <code>Hi I'm Lola 💜 Your Personal AI Wingwoman</code>
        </p>
        <p className="text-center">
          <a
            className="App-link"
            href="https://apps.apple.com/app/apple-store/id1663430725"
            target="_blank"
            rel="noopener noreferrer"
          >
            I am copying this app
          </a>
        </p>
      </Col>
    </Row>
    <Modal show = {showProPopup} onHide={handleCloseProPopup}>
        <Modal.Header closeButton>
          <Modal.Title>Upgrade to Pro to talk more to Lola</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> Upgrade now to get unlimited questions and more features!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseProPopup}>
            Close
          </Button>
          <Button variant = "primary" onClick={handleSignUpForPro}>
            Upgrade to Pro
          </Button>
        </Modal.Footer>
    </Modal>
    <View/>
    


);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  textAreaContainer: {
    width: '100%',
    marginBottom: 20,
    // ... Add more styling as needed
  },
  responseContainer: {
    width: '100%',
    // ... Add more styling as needed
  },
  // ... Add more styles as needed
});



export default App

// to runnnn app use : npm run dev 
// aws s3 sync build/ s3://lola-s3
// REACT_APP_API_URL=https://lola-back.onrender.com/
// REACT_APP_API_URL=http://3.80.220.82:3001/

// What do I need before deploying the app

// A way for users to login
// login users ask 5 questions
// then pop up for them to pay comes up
// pop up copies rizz (share for free, pay for more)

// I can remove the OCR and upload it when it fully works
// Just need to commit all of it out

// Eventuall
// Fix OCR
// update prompt based on time talking with Lola

// character limit
// if textbox is blank

