import React, { Component } from 'react';
import './App.css';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import particlesjs from './components/particlesjs-config.json';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Navigation from './components/Navigation';
import Rank from './components/Rank';
import ImgLink from './components/ImgLink';
import FaceDetect from './components/FaceDetect';

const app = new Clarifai.App({
  apiKey: '6c1703898e804e7d850a6754b44da6ef'
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  facebox = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFacebox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonDetect = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(
      "a403429f2ddf4b49b307e318f00e528b",
      this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(res => res.json()).then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
        }
        this.displayFacebox(this.facebox(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'SignIn') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='bg-particle' params={particlesjs} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}
          routeState={this.state.route} />
        {route === 'home' ?
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImgLink
              onInputChange={this.onInputChange}
              onButtonDetect={this.onButtonDetect} />
            <FaceDetect box={box} imageUrl={imageUrl} />
          </div>
          : (route === 'SignIn'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
