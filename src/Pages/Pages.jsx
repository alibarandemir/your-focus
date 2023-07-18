import React from 'react';
import Main from './Main';
import Counter from './Counter';
import {Routes,Route} from 'react-router-dom';
import ErrorPage from './ErrorPage';

function Pages () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/counter' element={<Counter/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      
      </Routes>
    </div>
  )
}

export default Pages;