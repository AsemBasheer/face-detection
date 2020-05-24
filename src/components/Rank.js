import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <p className='f2 mt2 ma0'>
            {`hello ${name}, your rank is ${entries}`}
            </p>
        </div>
    );
}
export default Rank; 