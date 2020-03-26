
import React from "react";
import ReactDOM from 'react-dom';
import { Polyline, Map, TileLayer, FeatureGroup} from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.css';

class ElenaMap extends React.Component {
  constructor() {
    super()
    this.mapRef = React.createRef();
    this.groupRef = React.createRef();
    this.state = {
      center: [42.361145, -71.057083],
      zoom: 20
    }
  }

  // componentDidMount(prevProps) {
  //    var map = this.mapRef.current;
  //    var featureGroup = this.groupRef.current;
  //    console.log(map);
  //    console.log(featureGroup);
  //    if(map !== null && featureGroup !== null){
  //      map = map.leafletElement
  //      featureGroup = featureGroup.leafletElement
  //      map.fitBounds(featureGroup.getBounds());
  //    }
  // }

  render() {
    const position = [this.state.center[0], this.state.center[1]];
    return (
      <div>
      <SearchBar />
      <Map center={position} zoom={this.state.zoom}  ref={this.mapRef}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <HighlightedRoute />
      </Map>
      </div>
    );
  }
}

class HighlightedRoute extends React.Component{

  constructor(){
    super()
    this.state = {
      highlighted_route: []
    }
  }

  render(){
    return(
      <FeatureGroup>
        <Polyline color="blue" positions={this.state.highlighted_route}/>
      </FeatureGroup>
    );
  }
}

class SearchBar extends React.Component{

  constructor(){
    super();
    this.state = {
      from : "",
      to : "",
    }
  }


  submitHandler = (event) =>{
    event.preventDefault();
    fetch("http://localhost:8080/" + this.state.from + "/" + this.state.to)
      .then(response => {return response.json();})
      .then(data => console.log(data))
  }

  changeHandler = (event) =>{
    const name = event.target.id
    const value = event.target.value
    this.setState({
      [name]: value,
    })
  }

  render(){
    return (
      <form onSubmit={this.submitHandler} id = "search_form">
        <div className="div_pad"></div>
        <div className="form-group row" >
          <input className="form-control"  type="text" name="origin"
           id="from" required placeholder="From" onChange={this.changeHandler}/>
        </div>
        <div className="form-group row" >
          <input className="form-control" type="text" name="destination"
          id="to" required placeholder="To" onChange={this.changeHandler}/>
        </div>
        <div className="form-example" >
          <input className="btn btn-primary" type="submit" value="Search"/>
        </div>
      </form>
    );
  }

}


ReactDOM.render(<ElenaMap />, document.getElementById('root'))
