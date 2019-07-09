import React, { Component} from "react";
import './Searchbar.scss'


const Searchbar= ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <h1>HOW DO YOU FEEL?</h1>
            <input type='text' onChange={onInputChange}/>
            <div  className='search-button' onClick={onButtonSubmit}>
                <div className='top'></div>
                <div className='left'></div>
                <p>Search</p>
                <div className='right'></div>
                <div className='bottom'></div>
            </div>
        </div>
    );
}

export default Searchbar;