import React from "react";
import './Searchbar.scss'


const Searchbar= ({onInputChange, onButtonSubmit, color, onButtonSubmitExtra}) => {
    return (
        <div>
            <h1 style={{color:color, transitionDuration: `3s`}}>HOW DO YOU FEEL?</h1>
            <input type='text' onChange={onInputChange} style={{borderColor:color, color:color, transitionDuration: `3s`}}/>
            <div  className='search-button' onClick={onButtonSubmit} style={{color:color, transitionDuration: `3s`}}>
                <p>Search</p>
            </div>
            <div  className='additional-search-button' onClick={onButtonSubmitExtra} style={{color:color, transitionDuration: `3s`}}>
                <p>Add Mood</p>
            </div>
        </div>
    );
}

export default Searchbar;