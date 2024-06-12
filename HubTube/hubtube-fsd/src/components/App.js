// src/App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HTLanding from './HTLanding';
import HTSignup from './HTSignup';
import HTLogin from './HTLogin';
import HTHome from './HTHome';
import HTVedio from './HTVedio';
import HTMovies from './HTMovies';
import HTSeries from './HTSeries';
import HTAdmin from './HTAdmin';
import { AuthProvider } from './AuthProvider';
import { UserProvider } from './UserContext';  // Import UserProvider
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <UserProvider>  {/* Wrap application in UserProvider */}
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<HTLanding />} />
            <Route exact path='/Signup' element={<HTSignup />} />
            <Route exact path='/Login' element={<HTLogin />} />
            <Route exact path='/Admindash' element={<ProtectedRoute element={HTAdmin} />} />
            <Route exact path='/home' element={<ProtectedRoute element={HTHome} />} />
            <Route exact path='/Home' element={<ProtectedRoute element={HTHome} />} />
            <Route exact path='/Vedio' element={<ProtectedRoute element={HTVedio} />} />
            <Route exact path='/Series' element={<ProtectedRoute element={HTSeries} />} />
            <Route exact path='/Movies' element={<ProtectedRoute element={HTMovies} />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
