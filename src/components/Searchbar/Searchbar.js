import React from "react";
import './Searchbar.scss'


const Searchbar= ({onInputChange, onButtonSubmit, color}) => {
    return (
        <div>
            <h1 style={{color:color, transitionDuration: `3s`}}>HOW DO YOU FEEL?</h1>
            <input type='text' onChange={onInputChange} style={{borderColor:color, color:color, transitionDuration: `3s`}}/>
            <div  className='search-button' onClick={onButtonSubmit} style={{color:color, transitionDuration: `3s`}}>
                <div className='top' style={{backgroundColor:color}}></div>
                <div className='left' style={{backgroundColor:color}}></div>
                <p>Search</p>
                <div className='right' style={{backgroundColor:color}}></div>
                <div className='bottom' style={{backgroundColor:color}}></div>
            </div>
        </div>
    );
}

export default Searchbar;