
import React from "react";
import ReactDOM from 'react-dom';
import { Polyline, Map, TileLayer, FeatureGroup, CircleMarker, Popup} from "react-leaflet";
import 'bootstrap/dist/css/bootstrap.css';
import SearchBar from './SearchBar';
import 'leaflet/dist/leaflet.css';

class ElenaMap extends React.Component {

  constructor() {
    super()
    this.state = {
      center: [42.361145, -71.057083],
      zoom: 20,
      highlighted_route: [],
      markers: [],
      popups: ["Origin", "Destination"],
      marker_color: ["green", "red"]
    }


    this.routeRef = React.createRef();
    this.mapRef = React.createRef();
  }

  highlighted_route = (route) => {
    const mapElement = this.mapRef.current.leafletElement;
    const routeElement = this.routeRef.current.leafletElement;
    this.setState({
      highlighted_route:route.values,
      markers: [route.values[0], route.values[route.values.length - 1]]
    },
    ()=>{
      mapElement.fitBounds(routeElement.getBounds())
    });
  }

  render() {
    const position = [this.state.center[0], this.state.center[1]];

    return (
      <div>
      <SearchBar onGetRoute={this.highlighted_route}/>
      <Map center={position} zoom={this.state.zoom}  ref={this.mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <FeatureGroup>
          <Polyline color="blue" weight='5' positions={this.state.highlighted_route} ref={this.routeRef}/>
          {this.state.markers.map((position, idx) =>
            <CircleMarker key={`marker-${idx}`} center={position} color="white" fillOpacity='0.8' fillColor={this.state.marker_color[idx]}>
            <Popup>{this.state.popups[idx]}</Popup>
            </CircleMarker>
          )}
        </FeatureGroup>
      </Map>
      </div>
    );
  }
}


ReactDOM.render(<ElenaMap />, document.getElementById('root'))
