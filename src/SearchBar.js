import React from "react";
import { Button } from 'react-bootstrap'
import AlgorithmMenu from './AlgorithmMenu'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


class SearchBar extends React.Component{

  constructor(props){
    super(props);
    this.top100Films = [];

    this.useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: 200,
        },
      },
    }));

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
    alert(uri.href)
    fetch(uri.href)
      .then(response =>  {return response.json();})
      .then(data => this.props.onGetRoute(data))
      .catch(error => alert("something went wrong"))
  }

  changeHandler = (event, event_value) =>{
    const name = event.target.id.split("-")[0]
    const value = event_value?  event_value : event.target.value

    this.setState({
      [name]: value,
    })
  }

  autocompleteSelectionHandler = (selection)=>{
    console.log(selection)
  }

  algoMenuSelectHandler = (selection) =>{
    this.setState({[selection.key]:selection.value})
  }


  render(){
    return (

      <form onSubmit={this.submitHandler} className={this.useStyles.root} >
        <div id="search_form">
          <Autocomplete
             freeSolo
             options={this.top100Films.map((option) => option.title)}
             id="from"
             onChange={this.changeHandler}
             renderInput={(params) => (
               <TextField
                 {...params}
                 label="Origin"
                 margin="normal"
                 variant="outlined"
                 onChange={this.changeHandler}
                 InputProps={{ ...params.InputProps, type: 'from_search' }}
               />
             )}
           />
            <Autocomplete
              freeSolo
              options={this.top100Films.map((option)=>option.title)}
              id="to"
              onChange={this.changeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  margin="normal"
                  variant="outlined"
                  onChange={this.changeHandler}
                  InputProps={{ ...params.InputProps, type: 'to_search'}}
                />
              )}
            />
            <AlgorithmMenu onSelect={this.algoMenuSelectHandler}/>
            <div className="pad_top" id="submit_button">
              <Button variant="outline-primary" type="submit">Search</Button>
            </div>
        </div>

      </form>
    );
  }
}

export default SearchBar;
