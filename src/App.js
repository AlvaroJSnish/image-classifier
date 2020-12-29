import { useEffect, useRef } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

import logo from './logo.svg';
import './App.css';

function App() {
  let webcam;
  let model;

  useEffect(() => {
    (async function() {
      model = await mobilenet.load();
    })();
  }, []);

  useEffect(() => {
    (async function() {
      const webcamElement = document.getElementsByTagName("video")[0];
      webcam = await tf.data.webcam(webcamElement);
    })();
  }, []);

  async function handleSnap() {
    const img = await webcam.capture();
    const predictions = await model.classify(img);
    img.dispose();
    console.log(predictions);
  }

  return (
    <div className="App">
      <header className="App-header">
        <video width={500}></video>
        <button className="capture-image" onClick={handleSnap}>SNAP</button>
      </header>
    </div>
  );
}

export default App;
