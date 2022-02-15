import 'swiper/css';
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter } from 'react-router-dom';

import Header from './components/header/Header'
import Router from './router/Router'
import Footer from './components/footer/Footer'

import './App.scss';

function App() {
    return (
      <BrowserRouter>
        
        <Header />

        <Router />

        <Footer />

      </BrowserRouter>
    );
}

export default App;
