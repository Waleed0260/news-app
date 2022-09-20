import "./App.css";

import React, { useState } from "react";
// import Nabar from "./Components/Nabar";
import News from "./Components/News";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




const App =()=> {
  const [progress, setProgress] = useState(0);
  const [apiKey, setapiKey] = useState('a201fcb147584b619710c1a4c0b7944d');


  // apiKey = 'a201fcb147584b619710c1a4c0b7944d'
// state = {
//   progress: 0
// }
// setProgress = (progress)=>{
//   this.setState({progress: progress})
// }


    return (
      <div>
        <Router>
        <nav className="navbar fixed-top navbar-expand-lg bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              NewsMonkey
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">Home</Link>
                </li>
                  <li> <Link className="nav-link" to="/business">Business</Link></li>
                  <li> <Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                  <li> <Link className="nav-link" to="/Sports">Sports</Link></li>
                  <li>  <Link className="nav-link" to="/health">Health</Link></li>
                  <li>  <Link className="nav-link" to="/science">Science</Link></li>
                  <li> <Link className="nav-link" to="/technology">Technology</Link></li>

              </ul>
            </div>
          </div>
        </nav>
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey}     key="general" pageSize={5} country="us" category="general"/>}/>
          <Route  exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey}   key="business" pageSize={5} country="us" category="business"/>}/>
          <Route  exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey}     key="sports" pageSize={5} country="us" category="sports"/>}/>

          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey}     key="Entertainment" pageSize={5} country="us" category="Entertainment"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="Health" pageSize={5} country="us" category="Health"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey}     key="Science" pageSize={5} country="us" category="Science"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey}     key="Technology" pageSize={5} country="us" category="Technology"/>}/>

        </Routes>
        </Router>
      </div>
    );
  }
export default App