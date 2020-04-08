import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { DropdownButton, Dropdown} from 'react-bootstrap'

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

export default AlgorithmMenu;
