import React, { Component } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import MoodList from './components/MoodList/MoodList'
import UserMessage from './components/UserMessage/UserMessage'
import ChangingBackground from './components/ChangingBackground/ChangingBackground';
import './App.scss';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      results: [],
      resultsExtra: [],
      display: 0,
      album: '',
      moods: [],
      message:'',
      newMood: 0,
      currentBackground:'#366790'
    }
  }
  
  componentDidMount(){
    const colours = ['#252f3b','#404040','#bfb230','#475f61','#0d0d0d','#5f436c','#6922fa','#8ca273','#ed7739','#80a467','#000000','#c8a21d','#c2b066','#e75138','#c1c8d8','#03987a','#1e3137','#25301f','#49070b','#4e3f1e','#885b6f','#877753','#fffbf2','#df1441','#ff7546','#91d25c','#d4b268','#273037','#ffdd00','#416e47','#b6d4f0','#f3b701','#f0acc1','#2a5343','#72a0ad','#0c474b','#e7e3e0','#b6cbd0','#d04e4e','#623317','#e22e53','#ebb8bf','#5a89cd','#575556','#366790', '#313131', '#f1e23d', '#d24c41', '#fcda90', '#0000fe', '#3bb6a2', '#ee3f24', '#74dfe9', '#a7c470', '#2f7ec0', '#363291', '#8c4088', '#80bbcd', '#291a21', '#f04531', '#ffa6c0', '#556258', '#0b0b09', '#2d7e6d', '#1d291d', '#1a1a1a', '#b92727', '#f1018a', '#fdfce7', '#0e1623'];
    const url = 'http://localhost:8888/mood-music/admin/phpscripts/album_query.php?pullMood=true';
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({moods: data});
        })
        .catch(function(error) {
          console.log(error);
        });
    const rotationLength = colours.length;
    var rotationCounter = 0;

    if(rotationCounter <= rotationLength){
      this.interval = setInterval(() => {
        this.setState({currentBackground: colours[rotationCounter]});
        if(rotationCounter <rotationLength -1){
          rotationCounter = rotationCounter + 1;
        }else if(rotationCounter === rotationLength - 1){
          rotationCounter = 0;
        }
        
      }, 6000);
    }
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

  onButtonSubmitExtra = () => {
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
              this.setState({resultsExtra: data});
              const firstSet = this.state.results;
              const secondSet = this.state.resultsExtra;
              var combinedSet = [];
              for (var x = 0; x < firstSet.length; x++){
                for(var y = 0; y < secondSet.length; y++){
                  if(firstSet[x].album_id === secondSet[y].album_id){
                    combinedSet.push(secondSet[y]);
                  }
                }
              }
              this.setState({results:combinedSet});
            })
            .catch(function(error) {
            console.log(error);
        });
        found = true;
      }else{
      }
    }
    if(found === false){
      console.log('firing');
      this.setState({message:"This mood is not currently in our Database(We're adding it now).  Please browse our most popular albums instead."});
      this.setState({display:1});
      
    }
  }
  
  render() {
    return (
      <div className="App" >
        <ChangingBackground color={this.state.currentBackground} />
        <Searchbar onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} onButtonSubmitExtra={this.onButtonSubmitExtra} color={this.state.currentBackground}/>
        <UserMessage opacity={this.state.display} message={this.state.message}/>
        <MoodList albums={this.state.results} color={this.state.currentBackground}/>
      </div>
    );

  }
  
}

export default App;
