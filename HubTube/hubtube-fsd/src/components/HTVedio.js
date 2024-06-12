import logimg from '../images/num1.png';
import '../CSS files/HTVedio.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function generatePreviewLink(driveLink) {
    const index = driveLink.indexOf("/view");
    if (index !== -1) {
        return driveLink.substring(0, index) + "/preview";
    } else {
        return driveLink;  
    }
}
const HTVedio = (props) => {
    const navigate = useNavigate();
    const [ishomevisble,sethomevisible]=useState(false);
    let previewLink = "";
    if(ishomevisble){
        navigate('/Home', { state: { userData: { } } })
    }
    if (typeof props.videoUrl === 'number') {
        const num = props.videoUrl.toString(); // Convert to string for comparison
        if (num === "1") {
            previewLink = "https://drive.google.com/file/d/1aQHIKqWN7tMvuCZQDKMm4c2A7ltrnCl0/preview";
        } else if (num === "2") {
            previewLink = "https://drive.google.com/file/d/1YI_1-QcT78Dra3Es8QWenuOEtU06ypX5/preview";
        }
        else if (num === "3") {
            previewLink = "https://drive.google.com/file/d/15Io8YdJnoUgAxzjRs9XlVDq44WB9T8B2/preview";
        }
    } else {
        previewLink = generatePreviewLink(props.videoUrl);
    }
    return (
        <div className='fullpage5'>
            <div className="block41">
                <img src={logimg} className="img15" alt="NUMBER1" />
                <input type="image" className='logoutlog' onClick={() => sethomevisible(true)} src="https://static.vecteezy.com/system/resources/previews/000/443/338/non_2x/logout-vector-icon.jpg" name="submit"  alt="submit" />                
            </div>
            <div className='vedioplayer'>
                <iframe src={previewLink} width="100%" height="670px" allowFullScreen></iframe>
            </div>
        </div>
    );
}
export default HTVedio;
