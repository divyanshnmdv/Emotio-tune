import React from 'react';
import FaceExpression from '../../Expression/components/FaceExpression';
import Player from '../components/Player';
import { useSong } from '../hooks/useSong';
import '../styles/home.scss';
import {useAuth} from "../../auth/hooks/useAuth"



const Home = () => {
    const { handleGetSong } = useSong()
    const {user,handleLogout} = useAuth()

     

   

    return (
        <div className="home-wrapper">
           
            <div className="top-bar">
                <div className="user-card">
                    <p className="username">{user.username}</p>
                    <p className="email">{user.email}</p>
                </div>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>

            <header className="branding">
                <h1 className="app-title">Emotio-Tunes</h1>
                <p className="app-tagline">We play what you feel</p>
            </header>

            <div className="content-section">
                <div className="card face-card">
                    <h2 className="card-title">Detect Your Mood 🎭</h2>
                    <FaceExpression
                        onClick={(expression) => { handleGetSong({ mood: expression }) }}
                    />
                </div>
                <Player />
            </div>
        </div>
    )
}

export default Home
