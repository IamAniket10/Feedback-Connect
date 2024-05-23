import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css';

import Header from './components/header/header';
import FeedbackForm from './components/form/form';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Login from './components/LoginSignup/login';


function App() {

  const location = useLocation();

  return (
    //<Router>
      <div className="App">
        <Header />
        <TransitionGroup>
        <CSSTransition
          key={location.key}
          timeout={500}
          classNames="page-transition"
        >
        <Routes location={location}>
          <Route path='/form' element={<FeedbackForm />} />
          <Route path='/signup' element={<LoginSignup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/" element={<Navigate to="/signup" />} />

        </Routes>
        </CSSTransition>
        </TransitionGroup>

      </div>
    //</Router>
  );
}


const AppWrapper = () => (
  <Router>
    <App />
  </Router>
)

export default AppWrapper;
