import React from 'react';

export const VisNodeSVG = (props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="390" height="150">
            <rect x="0" y="0" width="100%" height="100%" fill="#7890A7" strokeWidth="20" stroke="#ffffff" />
            <foreignObject x="15" y="10" width="100%" height="100%"> 
                <div xmlns="http://www.w3.org/1999/xhtml" style={{'fontSize':'40px'}}> 
                    <em>I</em> am 
                    <span style={{'color':'white', 'textShadow':'0 0 20px #000000'}}>HTML in SVG!</span> 
                    <div>And my label is {props.data.label}!</div>
                </div> 
            </foreignObject> 
        </svg>
    );
};

export default VisNodeSVG;