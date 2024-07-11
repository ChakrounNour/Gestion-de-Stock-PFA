import React, { useState } from "react";

import axios from 'axios';  
import '../style.css'  ;
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
class AddCategorie extends React.Component {
      
  constructor(props){  
    super(props)  
    this.state = {  
      id:"0",
      nomC:'',
      data:[]  ,
      successful: false,
      message: "",
        }  
        this.handleChang = this.handleChang.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
        }
 
        handleChang(e){
          this.setState({categorieSId:e.value, nomSC:e.label})
         }
   componentDidMount(){
    this.getOptions5();
  }
   onChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    let err = '';
 
    if (nam === "nomSSC"){
  
      if (val !="" && Number(val)) {
        err = <strong>Votre nom doit contenir des chaînes de caractères </strong>;
      }
    }
  
  
    this.setState({errormessage: err});
 
    this.setState({ [e.target.name]: val});
    this.setState({ [e.target.name]: e.target.value })
}
async getOptions5(){
  let user = JSON.parse(localStorage.getItem('user'));

  const res = await axios.get('http://localhost:4000/api/categorie',{   
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
  }})
  const data = res.data

  const options = data.map(d => ({
    "value" : d.id,
    "label" : d.nomC
  }))
  this.setState({selectOptions5: options})
 

}

  submitFormAdd = e => {
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/categorie', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
    method: 'post',
      body: JSON.stringify({ nomC:this.state.nomC,
    })
  })
  
  .then(res => res.json())
          .then(item => {
              this.props.toggle();
          })
          .catch(err => console.log(err));
  }
  
  
  handleInvalidSubmit(event, errors, values) {
    this.setState({errors, values});
  }

  componentDidUpdate(){
    // if item exists, populate the state with proper data
    this.getOptions5();
  }

  render() {
    return (
        <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} onInvalidSubmit={this.handleInvalidSubmit}>
          
      <FormGroup>
          <Input type="text" name="nomC"  maxlength="15" id="nomC" 
          onChange={this.onChange} value={this.state.nomC === null ? '' : this.state.nomC}
          placeholder="Nom Categorie"
           required/>
          {this.state.errormessage}
        </FormGroup> 
        <Button >Valider</Button>
 
        {this.state.message && (
          <div className="form-group">
            <div
              className={
                this.state.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          </div>
        )}
      </Form>
     
    );
  }
}

export default AddCategorie


