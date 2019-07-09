import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import MoodList from './components/MoodList/MoodList'
import UserMessage from './components/UserMessage/UserMessage'
import PopularAlbums from './components/PopularAlbums/PopularAlbums';
import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      results: [],
      popularResults: [],
      display: 0,
      album: '',
      moods: [],
      message:'',
      newMood: 0
    }
  }

  componentDidMount(){
    const url = 'http://localhost:8888/mood-music/admin/phpscripts/album_query.php?pullMood=true';
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({moods: data});
        })
        .catch(function(error) {
          console.log(error);
        });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () =>{
    if(this.state.display === 1){
      this.setState({message: ''});
      this.setState({display: 0});
    }
    var found = false;
    for(var i = 0; i < this.state.moods.length; i++){
      if(this.state.moods[i]['mood_name'].toLowerCase() === this.state.input.toLowerCase()){
        const url = 'http://localhost:8888/mood-music/admin/phpscripts/album_query.php?mood=' +this.state.input;
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => { 
              this.setState({results: data});
            })
            .catch(function(error) {
            console.log(error);
        });
        found = true;
        console.log(found);
      }else{
      }
    }
    if(found === false){
      console.log('firing');
      this.setState({message:"This mood is not currently in our Database(We're adding it now).  Please browse our most popular albums instead."});
      this.setState({display:1});
      
    }
  }

  pullPopularAlbums = () =>{
    console.log(this.state.newMood);
    const urlPop = 'http://localhost:8888/mood-music/admin/phpscripts/album_query.php?pullPopular=true';
    fetch(urlPop)
        .then((resp) => resp.json())
        .then((data) => { 
          this.setState({popularResults: data});
        })
        .catch(function(error) {
          console.log(error);
        });
  }
  
  render() {
    return (
      <div className="App">
        <Searchbar onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} suggestions={this.state.moods}/>
        <UserMessage opacity={this.state.display} message={this.state.message}/>
        <MoodList albums={this.state.results}/>
        <PopularAlbums albums={this.state.popularResults} mood={this.state.newMood}/>
      </div>
    );

  }
  
}

export default App;
