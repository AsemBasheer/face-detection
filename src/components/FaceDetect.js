import React from 'react';
import './FaceDetect.css';

const FaceDetect = ({ box, imageUrl }) => {
    if (imageUrl)
        return (
            <div className='flex justify-center'>
                <div className='absolute'>
                    <img id='inputImage' width='400rem' height='auto'
                        alt='detect-img' src={imageUrl} />
                    <div className='bounding-box'
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            left: box.leftCol,
                            bottom: box.bottomRow
                        }}></div>
                </div>
            </div>
        );
    else return (<div></div>);
}
export default FaceDetect; 