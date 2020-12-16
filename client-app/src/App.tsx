import React, { Component } from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import './App.css';
import axios, { AxiosResponse } from 'axios';
import { render } from '@testing-library/react';



class App extends Component{
  
  state={
    values: []
  }
  
  
  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
    .then((response : AxiosResponse<any>)=>{
      
      this.setState({values: response.data});
      
    });
  }

  render(){
    
    return  (
      <div className="App">
        <Header as='h2'>
        <Icon name='plug' />
        <Header.Content>Reactivities</Header.Content>
      </Header>

      <List>
        {this.state.values.map((value: any)=>(
          <List.Item key={value.id}>{value.name}</List.Item>
        ))}
      </List>
        
      </div>
    );
  }
}

export default App;
