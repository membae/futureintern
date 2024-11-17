import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return <>
  <Router>
    <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/signin' element={<Signin/>}></Route>
    </Routes>
  </Router>
  </>
}

export default App;
