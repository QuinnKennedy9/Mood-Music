import React, { Component } from 'react';
import './ChangingBackground.scss'

class MoodList extends Component {
    constructor() {
        super();
        this.state = {
            display: 0
        }
    }

    render() {
        return (
            <div className='background-changer' style={{backgroundColor:this.props.color, transitionDuration: `3s`}}></div>
        );
    
        }
    }


export default MoodList;