import React from 'react'
import Navbar from '../Navbar';
import Routes from '../../routes';
import './App.css';

function App() {
    return (
        <main>
            <div className='app'>
                <Navbar />
                <Routes />
            </div>
        </main>
    )
}

export default App;