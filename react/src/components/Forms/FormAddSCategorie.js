import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';  
import Select from 'react-select';

class AddSCategorie extends React.Component {
      
  constructor(props){  
    super(props)  
    this.state = {  
      id:"0",
      nomSC: '',
      categorieId:'',
      nomC:'',    
      successful: false,
      message: "",
        }  
        this.handleChang = this.handleChang.bind(this);
        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
        }
 
  handleChang(e){
    this.setState({categorieId:e.value, nomC:e.label})
   }
   componentDidMount(){
    this.getOptions5();
  }
   onChange = e => {
    let nam = e.target.name;
    let val = e.target.value;
    let err = '';
 
    if (nam === "nomSC"){
  
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
const res =  await axios.get('http://localhost:4000/api/categorie/',  
  {headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + user.token
  },
})
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
    fetch('http://localhost:4000/api/scategorie/'+this.state.categorieId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        nomSC: this.state.nomSC,
        categorieId : this.state.categorieId,
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
       <FormGroup row>  
          <Col sm={10}>  
            <Input type="text" name="nomSC" id="nomSC"  maxlength="15" 
            onChange={this.onChange} value={this.state.nomSC === null ? '' : this.state.nomSC} 
            placeholder="Nom sous-categorie"  required/>  
            {this.state.errormessage}

          </Col>  
        </FormGroup> 
        <FormGroup row>  
          <Col sm={10}>  
 
          <Select name="categorieId" id="categorieId" options={this.state.selectOptions5} 
          onChange={this.handleChang.bind(this)} 
        placeholder="Choisir catégorie"/>
    <p>Vous avez sélectionné <strong>{this.state.nomC} {this.state.categorieId}  </strong> </p>
          </Col>  
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

export default  AddSCategorie


