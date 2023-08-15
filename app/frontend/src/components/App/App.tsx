import React from 'react'
import Navbar from '../Navbar';
import Routes from '../../routes';
import Footer from '../Footer';
import './App.css';

function App() {
    return (
        <main>
            <div className='app'>
                <Navbar />
                <Routes />
                <Footer />
            </div>
        </main>
    )
}

export default App;