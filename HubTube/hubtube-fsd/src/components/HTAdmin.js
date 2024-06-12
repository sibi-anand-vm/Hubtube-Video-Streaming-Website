import '../CSS files/HTAdmin.css';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import logimg from '../images/num1.png';

const HTAdmin = () => {
    const [uinfo, setuinfo] = useState({
        uname: "",
        umail: "",
        udob: "",
        ucon:"",
        uuid:""
    });
    const navigate = useNavigate();
    const location = useLocation();
    const { userData } = location.state || {};
    const { username, usermail, dob, contributions, userID } = userData || {};

    useEffect(() => {
        if (userData) {
            setuinfo({
                uname: username,
                umail: usermail,
                udob: dob,
                ucon: contributions,
                uuid: userID
            });
        }
    }, [userData]);

    const [usersArray, setusersArray] = useState([]);
    const [sidebarval, setsidebarval] = useState(1);
    const [counts, setCounts] = useState({
        userCount: 0,
        movieCount: 0,
        seriesCount: 0,
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await fetch('http://localhost:4008/api/getcount', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCounts(data);
                } else {
                    console.error('Failed to fetch counts:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };
        fetchCounts();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let tabledataapi;
                if (sidebarval === 2) {
                    tabledataapi = 'http://localhost:4008/api/allvideos';
                } else if (sidebarval === 5) {
                    tabledataapi = 'http://localhost:4008/api/getvdoreq';
                } 
                else if (sidebarval === 4) {
                    tabledataapi = 'http://localhost:4008/api/getadminreq';
                } else {
                    tabledataapi = 'http://localhost:4008/api/allusers';
                }
    
                const response = await fetch(tabledataapi, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const usersData = await response.json();
                    setusersArray(usersData);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [sidebarval]);
    
    const VdoSubreq = async() => {
        const title = document.getElementById('title').value;
        const videoUrl = document.getElementById('videoUrl').value;
        const thumbnailUrl = document.getElementById('thumbnailUrl').value;
        const genre = document.getElementById('genre').value;
        const duration = document.getElementById('duration').value;
        const isSeries = document.getElementById('isSeries').value;
        const UploadBy = document.getElementById('UploadBy').value;
        try {
            const response = await fetch('http://localhost:4008/api/addvdoreq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, videoUrl, thumbnailUrl, genre, duration, isSeries, UploadBy })
            });

            if (response.ok) {
                const message = await response.text();
                toast.success(message);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('Error occurred while updating admin status.');
        }
    };
    const handleUpdateUser = async (UserID, mode) => {
        try {
            const response = await fetch('http://localhost:4008/api/updateuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ UserID, mode })
            });

            if (response.ok) {
                const message = await response.text();
                toast.success(message);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('Error occurred while updating admin status.');
        }
    };
    const handleRemoveUser = async (Usermail) => {
        try {
            const response = await fetch('http://localhost:4008/api/removeuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Usermail }),
            });

            if (response.ok) {
                const message = await response.text();
                toast.success(message);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('Error occurred while removing user.');
        }
    };

    const handleRemoveVideo = async (VideoID) => {
        try {
            const response = await fetch('http://localhost:4008/api/removevideo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ VideoID }),
            });

            if (response.ok) {
                const message = await response.text();
                toast.success(message);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('Error occurred while removing user.');
        }
    };
    const Adminbtnclick=async(uuid)=>{
        try {
            const response = await fetch('http://localhost:4008/api/addadminreq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({uuid})
            });

            if (response.ok) {
                const message = await response.text();
                toast.success(message);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('Error occurred while updating admin status.');
        }
    }
    const Delvdoreq = async (VideoID) => {
        try {
            const response = await fetch('http://localhost:4008/api/delVdoReq', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ VideoID }),
            });

            if (response.ok) {
                const message = await response.text();
                toast.success(message);
            } else {
                const errorMessage = await response.text();
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error('Error occurred while removing user.');
        }
    };
    const renderTableHeaders = () => {
        if (sidebarval === 2) {
            return (
                <>
                    <th className="th" id='col1'>Video Title</th>
                    <th className="th" id='col2'>isSeries</th>
                    <th className="th" id='col3'>Genre</th>
                    <th className="th" id='col4'>Uploaded At</th>
                    <th className="th" id='col5'>Upload By</th>
                    <th className="th" id='col6'>Duration</th>
                    <th className="th" id='col7'>VideoID</th>
                    <th className="th" id='col8'>Action</th>
                </>
            );
        } 
        else if(sidebarval===5){
            return (
                <>
                    <th className="th" id='col1'>Video Title</th>
                    <th className="th" id='col2'>isSeries</th>
                    <th className="th" id='col3'>Genre</th>
                    <th className="th" id='col4'>Uploaded At</th>
                    <th className="th" id='col5'>Upload By</th>
                    <th className="th" id='col6'>Duration</th>
                    <th className="th" id='col7'>VideoID</th>
                    <th className="th" id='col8'>Action</th>
                </>
            );
        }
            else {
            return (
                <>
                    <th className="th" id='col1'>UserName</th>
                    <th className="th" id='col2'>Email</th>
                    <th className="th" id='col3'>UserId</th>
                    <th className="th" id='col4'>Joined At</th>
                    <th className="th" id='col5'>Contributions</th>
                    <th className="th" id='col6'>isAdmin</th>
                    <th className="th" id='col7'>Action</th>
                </>
            );
        }
    };

    const renderTableRows = () => {
        if (sidebarval === 2) {
            return usersArray.map((video) => (
                <tr className='tr' key={video._id}>
                    <td className="td">{video.title}</td>
                    <td className="td">{video.isSeries}</td>
                    <td className="td">{video.genre}</td>
                    <td className="td">{new Date(video.createdAt).toLocaleDateString()}</td>
                    <td className="td">{video.UploadBy}</td>
                    <td className="td">{video.duration}</td>
                    <td className="td">{video.VideoID}</td>
                    <td className="td">
                        <button className="rus" onClick={() => handleRemoveVideo(video.VideoID)}>Remove</button>
                    </td>
                </tr>
            ));
        } else if (sidebarval === 5) {
            return usersArray.map((video) => (
                <tr className='tr' key={video._id}>
                    <td className="td">{video.title}</td>
                    <td className="td">{video.isSeries}</td>
                    <td className="td">{video.genre}</td>
                    <td className="td">{new Date(video.createdAt).toLocaleDateString()}</td>
                    <td className="td">{video.UploadedBy}</td>
                    <td className="td">{video.duration}</td>
                    <td className="td">{video.VideoID}</td>
                    <td className="td">
                        <button className="addb" onClick={() => handleRemoveVideo(video.VideoID)}>Add</button>
                        <button className="rus" onClick={() => Delvdoreq(video.VideoID)}>Remove</button>
                    </td>
                </tr>
            ));
        } else {
            return usersArray.map((user) => (
                <tr className='tr' key={user._id}>
                    <td className="td">{user.Username}</td>
                    <td className="td">{user.Usermail}</td>
                    <td className="td">{user.UserID}</td>
                    <td className="td">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="td">{user.Contributions}</td>
                    <td className="td">{user.isAdmin}</td>
                    <td className="td">
                        <button className="mad" onClick={() => handleUpdateUser(user.UserID, 1)}>Make Admin</button>
                        <button className="rad" onClick={() => handleUpdateUser(user.UserID, 0)}>Remove Admin</button>
                        <button className="rus" onClick={() => handleRemoveUser(user.Usermail)}>Remove</button>
                    </td>
                </tr>
            ));
        }
    };    
    return (
        <div className="body">
            <div className="sidebar">
                <div className="profile">
                    <img src="https://thumbs.dreamstime.com/z/user-management-sign-line-icon-logo-account-settings-concept-gear-linear-illustration-205021323.jpg" alt="Profile Picture" />
                    <h3>{uinfo.uname}</h3>
                    <p>Admin Member</p>
                </div>
                <nav className="dash">
                    <ul>
                        <li><a href="#" className={sidebarval === 7 ? "active" : ""} onClick={() => setsidebarval(7)}>User Profile</a></li>
                        <li><a href="#" className={sidebarval === 1 ? "active" : ""} onClick={() => setsidebarval(1)}>Users</a></li>
                        <li><a href="#" className={sidebarval === 2 ? "active" : ""} onClick={() => setsidebarval(2)}>Videos</a></li>
                        <li><a href="#" className={sidebarval === 3 ? "active" : ""} onClick={() => setsidebarval(3)}>Add Videos</a></li>
                        <li><a href="#" className={sidebarval === 4 ? "active" : ""} onClick={() => setsidebarval(4)}>Admin Request</a></li>
                        <li><a href="#" className={sidebarval === 5 ? "active" : ""} onClick={() => setsidebarval(5)}>Video Request</a></li>
                    </ul>
                </nav>
                <button className="quick-send" onClick={ () => navigate('/Home', { state: { userData: { } } })}>Go Back</button>
            </div>
            {sidebarval === 7 ? (
                 <div className="main-content" style={{ backgroundImage: 'url("your_background_image_url")', backgroundSize: 'cover', padding: '20px' }}>
                 <img src={logimg} className="imgofweb" alt="NUMBER1" />
                 <div className='addpad'>
                 <div className="profile-right" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
                     <div className="info-section">
                         <h3>Information</h3>
                         <p><strong>Username:</strong>{uinfo.uname}</p>
                         <p><strong>Email:</strong>{uinfo.umail}</p>
                         <p><strong>Date of Birth:</strong>{new Date(uinfo.udob).toLocaleDateString()}</p>
                         <p><strong>Contributions:</strong>{uinfo.ucon}</p>
                         <p><strong>UserID:</strong>{uinfo.uuid}</p>
                     </div>
                     <div className="spacer" style={{ margin: '20px 0' }}></div>
                     <div className="admin-request">
                         <p>Wanna Become an Admin?</p>
                         <button type='button' onClick={()=>Adminbtnclick(uinfo.uuid)}>Add Admin Request</button>
                     </div>
                 </div>
                 </div>
                 <ToastContainer position="top-right" />
             </div>
            ) : sidebarval !== 3 ? (
                <div className="main-content">
                    <img src={logimg} className="imgofweb" alt="NUMBER1" />
                    <header className="header">
                        <h2>Super Admin Member Dashboard</h2>
                        <div className="user-info">
                            <span>{uinfo.uname}</span>
                        </div>
                    </header>
                    <div className="stats">
                        <div className="stat-card green">
                            <h3>{counts.movieCount}</h3>
                            <p>Movies In DB</p>
                        </div>
                        <div className="stat-card purple">
                            <h3>{counts.seriesCount}</h3>
                            <p>Series In DB</p>
                        </div>
                        <div className="stat-card blue">
                            <h3>{counts.userCount}</h3>
                            <p>Users</p>
                        </div>
                        <div className="stat-card orange">
                            <h3>0</h3>
                            <p>Your Uploads</p>
                        </div>
                    </div>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    {renderTableHeaders()}
                                </tr>
                            </thead>
                            <tbody>
                                {renderTableRows()}
                            </tbody>
                        </table>
                    </div>
                    <ToastContainer position="top-right" />
                </div>
            ) : (
                <div className="video-form-container">
                    <h2>Add New Video</h2>
                    <form className="video-form" id="videoForm">
                        <div className="input-row">
                            <div className="input-col" id='colm1'>
                                <label className='tags' htmlFor="title">Title:</label><br />
                                <input type="text" id="title" name="title" required />
                            </div>
                            <div className="input-col" id='colm2'>
                                <label className='tags' htmlFor="videoUrl">Video URL:</label><br />
                                <input type="text" id="videoUrl" name="videoUrl" required />
                            </div>
                        </div>
    
                        <div className="input-row">
                            <div className="input-col" id='colm3'>
                                <label className='tags' htmlFor="thumbnailUrl">Thumbnail URL:</label><br />
                                <input type="text" id="thumbnailUrl" name="thumbnailUrl" required />
                            </div>
                            <div className="input-col" id='colm4'>
                                <label className='tags' htmlFor="genre">Genre:</label><br />
                                <input type="text" id="genre" name="genre" required />
                            </div>
                        </div>
    
                        <div className="input-row">
                            <label className='tags' htmlFor="duration">Duration(In minutes):</label>
                            <br />
                            <input type="text" id="duration" name="duration" required /><br />
                        </div>
    
                        <div className="input-row">
                            <label className='tags' htmlFor="isSeries" id='tags'>Is Series:</label><br />
                            <select id="isSeries" name="isSeries">
                                <option value="True">True</option>
                                <option value="False" selected>False</option>
                            </select><br />
                        </div>
    
                        <div className="input-row">
                            <label className='tags' htmlFor="UploadBy">Uploaded By(UserID):</label><br />
                            <input type="text" id="UploadBy" name="UploadBy" required /><br />
                        </div>
    
                        <button type="button" className='vsubreq' onClick={()=>VdoSubreq()}>Submit Request</button>
                        <ToastContainer position="top-right" />
                    </form>
                </div>
            )}
        </div>
    );
    
}

export default HTAdmin;