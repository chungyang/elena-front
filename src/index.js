
import React from "react";
import ReactDOM from 'react-dom';
import { Polyline, Map, TileLayer, FeatureGroup} from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from './SearchBar';

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


ReactDOM.render(<ElenaMap />, document.getElementById('root'))
