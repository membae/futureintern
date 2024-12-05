import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Employees from './pages/Employees';
import { AppContext } from './AppContextProvider';
import './App.css';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/employees' element={<Employees/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
