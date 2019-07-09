import React, { Component } from 'react';
import './PopularAlbums.scss'

class Album extends Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 0,
            rated: 0,
            mood: this.props.mood
        }
    }

    onAlbumClick = () =>{
        if(this.state.display === 0){
            this.setState({display:1})
        }else if (this.state.display === 1){
            this.setState({display:0});
        }
    }

    moodUp = (album, mood) =>{
        if(this.state.rated === 0){
            const url = 'http://localhost:8888/mood-music/admin/phpscripts/album_query.php?connect_album='+album+'&connect_mood='+mood;
            fetch(url)
                .catch(function(error) {
                    console.log(error);
                });
        }else if (this.state.rated === 1){
            console.log("You've already rated this album");
        }

        
        
    }

    moodDown = (mood) =>{
        
        if(this.state.rated === 0){
            console.log('fire');
        }else if (this.state.rated === 1){
            console.log("You've already rated this album");
        }

    }

    render() {
        return (
            <div>
            <img src={this.props.image} alt={this.props.name} onClick ={this.onAlbumClick}/>
            <div className='album-info' style={{opacity: this.state.display}}>
                <h2>{this.props.name}</h2>
                <iframe src={this.props.code}width="100%" height="380" frameBorder="0" title={this.props.name}allowtransparency="true" allow="encrypted-media"></iframe>
                <h3>Does this match your mood?</h3>
                <i className="fas fa-thumbs-up" onClick={() => this.moodUp(this.props.id, this.props.mood)}></i>
                <i className="fas fa-thumbs-down" ></i>
            </div>
            </div>
        )
    }
}



class PopularAlbums extends Component {
    constructor() {
        super();
        this.state = {
            display: 0
        }
    }

    render() {
        return (
            <div>
            <div className = 'album-container'>
            {this.props.albums.map(item =>
                <div className='album' key={item.album_id} id={item.album_id}>
                    <Album image = {item.album_art} code={item.album_embed_code} name = {item.album_name} mood={item.mood_album_id} id={this.props.mood}/>
                </div>
            )}
            </div>
        </div>
        );
    
        }
    }


export default PopularAlbums;