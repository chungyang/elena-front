import React from "react";
import { Button } from 'react-bootstrap'
import AlgorithmMenu from './AlgorithmMenu'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';


class SearchBar extends React.Component{

  constructor(props){
    super(props);


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
      elevationMode: "min",
      locationNames: [{name:"jersey"}]
    }
  }

  submitHandler = (event) =>{
    event.preventDefault();
    const uri = new URL("http://localhost:8080/search");
    uri.searchParams.append("from", this.state.from);
    uri.searchParams.append("to", this.state.to);
    uri.searchParams.append("algorithm", this.state.algorithm);
    uri.searchParams.append("elemode", this.state.elevationMode);
    uri.searchParams.append("percentage", this.state.percentage);

    fetch(uri.href)
      .then(response =>  {return response.json()})
      .then(data => this.props.onGetRoute(data))
      .catch(error => alert("something went wrong"))
  }

   requestForOptions = (name) => {
    const uri = new URL("http://localhost:8080/autocomplete");
    uri.searchParams.append("name", name);

    fetch(uri.href)
      .then(response => { return response.json()} )
      .then(data => this.setState({locationNames: data.values}))
  }

  changeHandler = (event, event_value) =>{
    const name = event.target.id.split("-")[0]
    const value = event_value?  event_value : event.target.value
    this.setState({
      [name]: value,
    })
    if(name === "from" && this.state.from.length >= 2){
      this.requestForOptions(this.state.from)
    }
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
             options={this.state.locationNames.map((option) => option.name)}
             id="from"
             onChange={this.changeHandler}
             renderInput={(params) => (
               <TextField
                 {...params}
                 label="Origin"
                 margin="normal"
                 variant="filled"
                 onChange={this.changeHandler}
                 InputProps={{ ...params.InputProps, type: 'from_search' }}
               />
             )}
           />
            <Autocomplete
              freeSolo
              options={this.state.locationNames.map((option)=>option.name)}
              id="to"
              onChange={this.changeHandler}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination"
                  margin="normal"
                  variant="filled"
                  onChange={this.changeHandler}
                  InputProps={{ ...params.InputProps, type: 'to_search'}}
                />
              )}
            />
            <AlgorithmMenu onSelect={this.algoMenuSelectHandler}/>
            <div className="pad_top" id="submit_button">
              <Button variant="outline-secondary" type="submit">Search</Button>
            </div>
        </div>

      </form>
    );
  }
}

export default SearchBar;
