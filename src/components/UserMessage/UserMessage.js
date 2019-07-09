import React, { Component } from 'react';
import './UserMessage.scss'


class UserMessage extends Component {
    render() {
        return (
            <div>
                <div style={{opacity:this.props.opacity}}>
                    <h2 >{this.props.message}</h2>
                </div>
            </div>
        );
    
        }
    }


export default UserMessage;