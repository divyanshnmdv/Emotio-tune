import { createContext } from "react";
import { useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({ children }) => {

    const [ song, setSong ] = useState({
        "url": "https://ik.imagekit.io/divyanshnmdv/moodify/songs/Chaar_Kadam_-_RiskyjaTT.CoM_9f0pBCz6d.mp3",
        "posterUrl": "https://ik.imagekit.io/divyanshnmdv/moodify/posters/Chaar_Kadam_-_RiskyjaTT.CoM_NhAr3EqGS.jpeg",
        "title": "Chaar Kadam",
        "mood": "Mood",
    })

    const [ loading, setLoading ] = useState(false)

    return (
        <SongContext.Provider
            value={{ loading, setLoading, song, setSong }}
        >
            {children}
        </SongContext.Provider>
    )

}