import React from 'react';
import Logo from './Logo';

const Navigation = ({ isSignedIn, onRouteChange }) => {
    if (isSignedIn) {
        return (
            <nav className='flex justify-between'>
                <Logo />
                <p onClick={() => onRouteChange('SignIn')} className='f4 dim link pa2 ma3 pointer'>Sign Out</p>
            </nav>)
    }
    else {
        return (
            <nav className='flex justify-between'>
                <Logo />
                <div>
                <p onClick={() => onRouteChange('SignIn')} className='f4 dim link pa2 ma3 pointer'>Sign in</p>
                <p onClick={() => onRouteChange('Register')} className='f4 dim link pa2 ma3 pointer'>Register</p>
                </div>
            </nav>)
    }
}
export default Navigation; 