
import React from "react";
import ReactDOM from 'react-dom';
import { Polyline, Map, TileLayer, FeatureGroup} from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.css';
import { DropdownButton, Dropdown, Button} from 'react-bootstrap'

class ElenaMap extends React.Component {

  constructor() {
    super()
    this.state = {
      center: [42.361145, -71.057083],
      zoom: 20,
      highlighted_route: []
    }

    this.routeRef = React.createRef();
    this.mapRef = React.createRef();
  }

  highlighted_route = (route) => {
    const mapElement = this.mapRef.current.leafletElement;
    const routeElement = this.routeRef.current.leafletElement;
    this.setState({highlighted_route:route.values});
    mapElement.fitBounds(routeElement.getBounds());
  }

  render() {
    const position = [this.state.center[0], this.state.center[1]];
    return (
      <div>
      <SearchBar onGetRoute={this.highlighted_route}/>
      <Map center={position} zoom={this.state.zoom}  ref={this.mapRef}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <FeatureGroup>
          <Polyline color="blue" positions={this.state.highlighted_route} ref={this.routeRef}/>
        </FeatureGroup>
      </Map>
      </div>
    );
  }
}

class AlgorithmMenu extends React.Component{
  constructor(props){
    super(props);
    this.algorithms = ["A*", "Dijkstra"];
    this.elevationModes = ["Max", "Min"];
    this.state = {
      algorithm: "Choose an algorithm",
      elevation: "Choose an elevation mode"
    }
  }

  changeAlgorithm = (eventKey, event) =>{
    this.setState({algorithm:eventKey})
    return this.props.onSelect({key:"algorithm", value:eventKey.toLowerCase()});
  }

  changeElevationMode =  (eventKey, event) =>{
    this.setState({elevation:eventKey})
    return this.props.onSelect({key:"elevation", value:eventKey.toLowerCase()});
  }

  render(){
    return(
      <div>
        <b>Algorithm</b>
        <DropdownButton id="dropdown-basic-button" title={this.state.algorithm} variant="outline-primary">
          <Dropdown.Item eventKey = {this.algorithms[0]} onSelect={this.changeAlgorithm} >A*</Dropdown.Item>
          <Dropdown.Item eventKey = {this.algorithms[1]} onSelect={this.changeAlgorithm}>Dijkstra</Dropdown.Item>
        </DropdownButton>
        <div className="pad_top"/>
        <b>Elvation Mode</b>
        <DropdownButton id="dropdown-basic-button" title={this.state.elevation} variant="outline-primary">
          <Dropdown.Item eventKey = {this.elevationModes[0]} onSelect={this.changeElevationMode}>Max</Dropdown.Item>
          <Dropdown.Item eventKey = {this.elevationModes[1]} onSelect={this.changeElevationMode}>Min</Dropdown.Item>
        </DropdownButton>
      </div>
    );
  }
}

class SearchBar extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      from : "",
      to : "",
      percentage: "50",
      algorithm: "dijkstra",
      elevationMode: "min"
    }
  }

  submitHandler = (event) =>{
    event.preventDefault();
    const uri = "http://localhost:8080/" + this.state.from + "/" + this.state.to
              + "/" + this.state.algorithm + "/" + this.state.elevationMode
              + "/" + this.state.percentage
    alert(uri)
    fetch(uri)
      .then(response => {
        if(!response.ok) alert("Server is not avaiable")
        else return response.json();})
      .then(data => this.props.onGetRoute(data))
  }

  changeHandler = (event) =>{
    const name = event.target.id
    const value = event.target.value
    this.setState({
      [name]: value,
    })
  }

  algoMenuSelectHandler = (selection) =>{
    this.setState({[selection.key]:selection.value})
  }

  render(){
    return (
      <div>
        <form onSubmit={this.submitHandler} id = "search_form">
          <div className="pad_top"></div>
          <div className="form-group row" >
            <input className="form-control"  type="text" name="origin"
             id="from" required placeholder="From" onChange={this.changeHandler}/>
          </div>
          <div className="form-group row" >
            <input className="form-control" type="text" name="destination"
            id="to" required placeholder="To" onChange={this.changeHandler}/>
          </div>
          <div className="form-group row" >
            <input className="form-control" type="text" name="percentage"
            id="shortest_percent" required placeholder="Shortest Path %" onChange={this.changeHandler}/>
          </div>
          <AlgorithmMenu onSelect={this.algoMenuSelectHandler}/>
          <div className="pad_top" id="submit_button">
            <Button variant="outline-primary" type="submit">Search</Button>
          </div>
        </form>
      </div>
    );
  }
}


ReactDOM.render(<ElenaMap />, document.getElementById('root'))
