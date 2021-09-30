import React ,{useState, useEffect} from 'react'
import axios from 'axios'
import './FuturamaDataFetch.css'
export const FuturamaDataFetch = () => {
    
    const URL = 'https://api.sampleapis.com/futurama/characters'
    const [userInfo , setUserInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    function fetchData(){
        return axios
            .get(URL)
            .then(res=> res.data)
            .catch(err=> setError(err))
            .finally(() => setLoading(false));
            
    }

    useEffect(() => {
        fetchData()
            .then(data=>setUserInfo(data))
            
    }, [])

    if (loading) {
        return <p>Data is loading...</p>;
    }

    if (error || !Array.isArray(userInfo)) {
        return <p>There was an error loading your data!</p>;
    }

    return (

        <div className="main-container">
            <div className="header">
                <h1>Futurama Characters</h1>
            </div>
            {userInfo.length > 0 ? userInfo.map((item, index)=>{
               return ( 
                <div key={item.id} className="character-container">
                    <img src={item.images.main} alt={item.id}/>
                    <div className="content-container">
                        <ul>
                            <li><b>Name: </b>{item.name.first} {item.name.middle} {item.name.last}</li>
                            <li><b>Gender: </b>{item.gender}</li>
                            <li><b>Age: </b>{item.age}</li>
                            <li><b>Species: </b>{item.species}</li>
                            <li><b>Home Planet: </b>{item.homePlanet}</li>
                            <li><b>Occupation: </b>{item.occupation}</li>
                        </ul> 
                    </div>
                </div>
                )
            }): null} 
            
        </div>
    )
}
