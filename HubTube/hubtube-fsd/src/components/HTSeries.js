import '../CSS files/HTSeries.css'
import HTVedio from './HTVedio';
import logimg from '../images/num1.png';
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
const HTSeries=()=>{
    const [videosArray, setVideosArray] = useState([]);
    const [currVideoUrl, setCurrVideoUrl] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4008/api/series1', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const videosData = await response.json();
                    setVideosArray(videosData);
                    console.log('Fetched data:', videosData);
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
return(
    <>
 <div className="fullpage5">
                <div className='forthumb1'>
                    <div className="block51">
                        <img src={logimg} className="img13" alt="NUMBER1" />
                        <input type="image" className='logoutlogos1' onClick={() => navigate('/Home')} src="https://static.vecteezy.com/system/resources/previews/000/443/338/non_2x/logout-vector-icon.jpg" name="submit"  alt="submit" />
                    </div>
                    <div className='block52'>
                        <h1>Stranger Things</h1>
                        <h2>Out Now</h2>
                        <button className='play1btn' onClick={() => setCurrVideoUrl(2)}>Play</button>
                    </div>
                </div>
                <div className='block53'>
                    <h1>On Prime</h1>
                    <div className='vidslides1'>
                        {videosArray.map((video, index) => (
                            <div className='layer2' key={index}>
                                <img src={video.thumbnailUrl} alt={video.title} width="198" height="120" />
                                <h2>{video.title}</h2>
                                <h3>{video.genre}</h3>
                                <h3>Duration:{video.duration}</h3>
                                <button className='watchbtn1' onClick={() => setCurrVideoUrl(video.videoUrl)}>Watch Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </>
)
}
export default HTSeries;