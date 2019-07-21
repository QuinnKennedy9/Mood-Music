import React, { Component } from 'react';
import './MoodList.scss'

class Album extends Component {
    constructor() {
        super();
        this.state = {
            display: 0,
            rated: 0,
            rating:0,
            upClass: 'fas fa-thumbs-up',
            downClass: 'fas fa-thumbs-down'
        }
    }

    componentDidMount(){
        var rating = Number(this.props.rating)
        this.setState({rating: rating});
    }
    onAlbumClick = () =>{
        if(this.state.display === 0){
            this.setState({display:1})
        }else if (this.state.display === 1){
            this.setState({display:0});
        }
    }

    moodUp = (mood) =>{
        if(this.state.rated === 0){
            const url = 'http://localhost:8888/mood-music/admin/phpscripts/album_query.php?upRate=' +mood;
            fetch(url)
                .catch(function(error) {
                console.log(error);
            });
            this.setState({rated:1});
            var oldRating = this.state.rating;
            console.log(oldRating);
            var newRating = oldRating + 1;
            console.log(newRating);
            this.setState({rating:newRating});
            this.setState({downClass: 'fas fa-thumbs-up slideRight'})
        }else if (this.state.rated === 1){
            console.log("You've already rated this album");
        }
        
    }

    moodDown = (mood) =>{
        
        if(this.state.rated === 0){
            const url = 'http://localhost:8888/mood-music/admin/phpscripts/album_query.php?downRate=' +mood;
            fetch(url)
                .catch(function(error) {
                console.log(error);
            });
            this.setState({rated:1});
            var oldRating = this.state.rating;
            console.log(oldRating);
            var newRating = oldRating - 1;
            console.log(newRating);
            this.setState({rating:newRating});
            this.setState({upClass: 'fas fa-thumbs-up slideLeft'})
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
                <i className={this.state.upClass} onClick={() => this.moodUp(this.props.mood)}></i>
                <i className={this.state.downClass} onClick={() => this.moodDown(this.props.mood)}></i>
                <h3>Overall Rating: {this.state.rating}</h3>
            </div>
            </div>
        )
    }
}



class MoodList extends Component {
    constructor() {
        super();
        this.state = {
            display: 0,
            nextPosition: 0,
            currentPosition: 0
        }
    }

    NextAlbums = () => {
        const newPosition = this.state.currentPosition - 100;
        this.setState({currentPosition: newPosition});
        
        
    }

    PrevAlbums = () => {
        if(this.state.currentPosition < 0){
            const newPosition = this.state.currentPosition + 100;
            this.setState({currentPosition: newPosition});
        }
    }

    render() {
        return (
            <div>
                <div className='switch-arrows'>
                    <i className="fas fa-arrow-left changer" onClick={this.PrevAlbums} style={{color:this.props.color}}></i>
                    <i className="fas fa-arrow-right changer" onClick={this.NextAlbums} style={{color:this.props.color}}></i>
                </div>
            <div className = 'album-container' style = {{left:this.state.currentPosition+'%'}}>
            {this.props.albums.map(item =>
                <div className='album' key={item.album_id} id={item.album_id}>
                    <Album image = {item.album_art} code={item.album_embed_code} name = {item.album_name} mood={item.mood_album_id} rating={item.ma_rating}/>
                </div>
            )}
            </div>
        </div>
        );
    
        }
    }


export default MoodList;