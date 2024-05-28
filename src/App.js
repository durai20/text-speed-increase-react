import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [speed, setSpeed] = useState(1);
  const [size, setSize] = useState(1);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      setIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, 300 / speed);

    return () => clearInterval(interval);
  }, [text, index, speed]);

  const increaseSpeed = () => {
    setSpeed(prevSpeed => prevSpeed + 1);
  };

  const decreaseSpeed = () => {
    setSpeed(prevSpeed => Math.max(prevSpeed - 1, 1)); // Ensure speed doesn't go below 1
  };

  const increaseSize = () => {
    setSize(prevSize => prevSize + 1);
  };

  const decreaseSize = () => {
    setSize(prevSize => Math.max(prevSize - 1, 1)); // Ensure size doesn't go below 1
  };

  return (
    <div className="App">
      <div>
        <div className="row g-3">
          <div className="col-sm-7">
            <label htmlFor="inputText" className="col-sm-2 col-form-label">Enter text</label>
            <input 
              id="inputText" 
              type="text" 
              className="form-control" 
              placeholder=""
              onChange={(e) => {
                setText(e.target.value);
                setIndex(0);
                setDisplayedText('');
              }}
            />
          </div>
          <div className="col-sm">
            <label htmlFor="inputSize" className="col-sm-2 col-form-label">Size</label>
            <div className="input-group">
              <input 
                id="inputSize" 
                type="text" 
                className="form-control" 
                value={size} 
                oncChange = {(e) => {setSize(e.target.value)}}
              />
              <button className="btn btn-outline-secondary" type="button" onClick={increaseSize}>+</button>
              <button className="btn btn-outline-secondary" type="button" onClick={decreaseSize}>-</button>
            </div>
          </div>
          <div className="col-sm">
            <label htmlFor="inputSpeed" className="col-sm-2 col-form-label">Speed</label>
            <div className="input-group">
              <input 
                id="inputSpeed" 
                type="text" 
                className="form-control" 
                value={speed} 
              />
              <button className="btn btn-outline-secondary" type="button" onClick={increaseSpeed}>+</button>
              <button className="btn btn-outline-secondary" type="button" onClick={decreaseSpeed}>-</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: `${size}em`, marginTop: '10%' }}>
          {displayedText}
        </h3>
      </div>
    </div>
  );
}

export default App;
