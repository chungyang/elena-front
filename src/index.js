
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
      zoom: 20,
      highlighted_route: [[42.704202, -71.502017],
	       [42.7036844, -71.5020453],
	       [42.7035846, -71.5020392]]
    }
  }

  componentDidMount() {
     const map = this.mapRef.current.leafletElement;  //get native Map instance
     console.log(map)
     // map.fitBounds(group.getBounds());
  }

  render() {
    const position = [this.state.center[0], this.state.center[1]];
    return (
        <Map center={position} zoom={this.state.zoom}  ref={this.mapRef}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
            boundsOptions={this.state.highlighted_route}
          />
          <FeatureGroup ref={this.groupRef}>
            <Polyline color="blue" positions={this.state.highlighted_route}/>
          </FeatureGroup>
        </Map>
    );
  }
}

class SearchBar extends React.Component{
  render(){
    return (
      <form action="" method="get" >
        <div className="div_pad"></div>
        <div className="form-group row" id="search_form">
          <input className="form-control" type="text" name="origin" id="from" required placeholder="From"/>
        </div>
        <div className="form-group row" id="search_form">
          <input className="form-control" type="text" name="destination" id="to" required placeholder="To"/>
        </div>
        <div className="form-example" id="search_form">
          <input className="btn btn-primary" type="submit" value="Search"/>
        </div>
      </form>
    );
  }

}


ReactDOM.render(<ElenaMap />, document.getElementById('root'))
ReactDOM.render(<SearchBar />, document.getElementById('form'))
