import React from "react";
import { Button } from 'react-bootstrap'
import AlgorithmMenu from './AlgorithmMenu'

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
    const uri = new URL("http://localhost:8080/search");
    uri.searchParams.append("from", this.state.from)
    uri.searchParams.append("to", this.state.to)
    uri.searchParams.append("algorithm", this.state.algorithm)
    uri.searchParams.append("elemode", this.state.elevationMode)
    uri.searchParams.append("percentage", this.state.percentage)

    fetch(uri.href)
      .then(response =>  {return response.json();})
      .then(data => this.props.onGetRoute(data))
      .catch(error => alert("something went wrong"))
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
            <input className="form-control"  type="text"
             id="from" required placeholder="From" onChange={this.changeHandler}/>
          </div>
          <div className="form-group row" >
            <input className="form-control" type="text"
            id="to" required placeholder="To" onChange={this.changeHandler}/>
          </div>
          <div className="form-group row" >
            <input className="form-control" type="text"
            id="percentage" required placeholder="Shortest Path %" onChange={this.changeHandler}/>
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

export default SearchBar;
