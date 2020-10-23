import React from 'react';
import { PropTypes } from 'prop-types';

export default function Merac(props) {
    const [podatoci, setPodatoci] = React.useState({
        A: 0,
        B: 0,
        C: 0,
        D: 0
    });

    React.useEffect(() => {
        if(props.onChange) {
            props.onChange(podatoci);
            console.log(podatoci);
        }
      }, [podatoci]);

    const btnStyle = {
        width: '25px',
        fontWeight: 'bold'
    }
    const spanStyle = {
        ...btnStyle,
        width: '40px',
        display: 'inline-block'
    }

    const handleClick = (data) => {
        setPodatoci({...podatoci, ...data});
        console.log(podatoci);
        /*if(props.onChange) {
            props.onChange(podatoci);
            console.log(podatoci);
        }*/
    }

    return (
        <div>
            <div>
                <button className="btn btn-danger btn-sm" style={btnStyle} onClick={()=>handleClick({A: podatoci.A-1})}>-</button>
                <span className="fill m-2 text-center" style={spanStyle}>{podatoci.A}</span>
                <button className="btn btn-primary btn-sm" style={btnStyle} onClick={()=>handleClick({A: podatoci.A+1})}>+</button>
            </div>
            <div>
                <button className="btn btn-danger btn-sm" style={btnStyle} onClick={()=>handleClick({B: podatoci.B-1})}>-</button>
                <span className="fill m-2 text-center" style={spanStyle}>{podatoci.B}</span>
                <button className="btn btn-primary btn-sm" style={btnStyle} onClick={()=>handleClick({B: podatoci.B+1})}>+</button>
            </div>
            <div>
                <button className="btn btn-danger btn-sm" style={btnStyle} onClick={()=>handleClick({C: podatoci.C-1})}>-</button>
                <span className="fill m-2 text-center" style={spanStyle}>{podatoci.C}</span>
                <button className="btn btn-primary btn-sm" style={btnStyle} onClick={()=>handleClick({C: podatoci.C+1})}>+</button>
            </div>
            <div>
                <button className="btn btn-danger btn-sm" style={btnStyle} onClick={()=>handleClick({D: podatoci.D-1})}>-</button>
                <span className="fill m-2 text-center" style={spanStyle}>{podatoci.D}</span>
                <button className="btn btn-primary btn-sm" style={btnStyle} onClick={()=>handleClick({D: podatoci.D+1})}>+</button>
            </div>
        </div>
    );
}
