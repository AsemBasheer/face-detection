import React from 'react';

const ImgLink = ({ onInputChange, onButtonDetect }) => {
    return (
        <div>
            <p className='f4 pa2 mb0'>Insert images to detect faces</p>
            <div className='center pa2 ma2 mt0 w-50'>
                <input className='br3 w-90 shadow-2 pa2 ma1 b--blue'
                    type='text' placeholder='insert image link'
                    onChange={onInputChange}
                />
                <div>
                    <button className='br3 grow w4 pointer shadow-2 
                    ph1 link ma1 bg-red white b--red'
                        onClick={onButtonDetect}>Detect faces</button>
                </div>
            </div>
        </div>
    );
}
export default ImgLink; 