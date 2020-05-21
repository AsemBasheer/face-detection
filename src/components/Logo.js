import React from 'react';
import Tilt from 'react-tilt';
import faceLogo from './logo.png';

const Logo = () => {
    return (
        <div className="ma3">
            <Tilt className="Tilt br2 shadow-2 bg-white-10"
                options={{ max: 35 }}
                style={{ height: 120, width: 120 }} >
                <div className="Tilt-inner pa1">
                    <img alt={'logo'} src={faceLogo} />
                </div>
            </Tilt>
        </div>
    );
}
export default Logo; 