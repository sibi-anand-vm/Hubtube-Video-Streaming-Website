import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import logimg from '../images/num1.png';
import '../CSS files/HTHome.css';
import HTVedio from './HTVedio';// Import the UserData class

const HTHome = () => {
    const [videosArray, setVideosArray] = useState([]);
    const [currVideoUrl, setCurrVideoUrl] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = location.state;
    const { username, usermail,dob,contributions, userID } = userData;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4008/api/allvideos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const videosData = await response.json();
                    setVideosArray(videosData);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    if (currVideoUrl) {
        return <HTVedio videoUrl={currVideoUrl} />;
    }

    return (
        <>
            <div className="fullpage4">
                <div className='forthumb'>
                    <div className="block31">
                        <img src={logimg} className="img11" alt="NUMBER1" />
                        <nav className='hnavbar'>
                            <ul>
                                <li><Link to="/Home">Home</Link></li>
                                <li><Link to="/Series">Series</Link></li>
                                <li><Link to="/Movies">Movies</Link></li>
                                <li><Link to="/Ground">My Ground</Link></li>
                            </ul>
                        </nav>
                        <input className='search-box' type='text' placeholder='Search.. ' />
                        <input
    type="image"
    className='adminbtn'
    onClick={() => navigate('/Admindash', { state: { userData: { username, usermail, dob, contributions, userID } } })}
    src="https://www.downloadclipart.net/large/45631-admin-button-icon-clipart.png"
    name="submit"
    alt="submit"
/>

                        <input type="image" className='logoutlogos' src="https://static.vecteezy.com/system/resources/previews/000/443/338/non_2x/logout-vector-icon.jpg" onClick={() => window.location.href = "/login"} name="submit" alt="submit" />
                    </div>
                    <div className='block32'>
                        <h1>JD Vs Bhavani</h1>
                        <h2>For You</h2>
                        <button className='playbtn' onClick={() => setCurrVideoUrl(1)}>Play</button>
                    </div>
                </div>
                <div className='block33'>
                    <h1>Top Picks For You</h1>
                    <div className='vidslides'>
                        {videosArray.map((video, index) => (
                            <div className='layer1' key={index}>
                                <img src={video.thumbnailUrl} alt={video.title} width="198" height="120" />
                                <h2>{video.title}</h2>
                                <h3>{video.genre}</h3>
                                <h3>Duration:{video.duration}</h3>
                                <button className='watchbtn' onClick={() => setCurrVideoUrl(video.videoUrl)}>Watch Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HTHome;