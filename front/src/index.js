import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Reservation from './pages/Reservation';
import Signin from './component/LOGIN/user';
import SignUp from './component/LOGIN/signup';
import Resetpsw from './components/Resetpsw';
import { AuthProvider } from './component/AuthContext';
import CatGallery from './pages/CatGallery';
import Admin from './pages/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthProvider>
     <Router>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/res" element={<Reservation/>}/>
        <Route path="/auth" element={<Signin/>}/>
        <Route path="/sign" element={<SignUp/>}/>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/fgp" element={<Resetpsw/>}/>
        <Route path="/cat" element={<CatGallery/>}/>
      </Routes>
    </Router>
    </AuthProvider>
  </React.StrictMode>
);



