import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';  
import Select from 'react-select';

class AddForm extends React.Component {
 
  state = {
    id: 0,
    nom: '',

    options:[]
    }
  handleInvalidSubmit = this.handleInvalidSubmit.bind(this)

  handleChange(e){
    this.setState({article_id:e.value, nomA:e.label})
   }
handleInvalidSubmit(event, errors, values) {
  this.setState({errors, values});
}
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
}
async getOptions(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/article',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.nomA
  
    }))
  
    this.setState({options: options})
  
  }
  

 
  submitFormAdd = e => {
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/client', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        nomCli: this.state.nomCli,
        prenomCli: this.state.prenomCli,
        telCli: this.state.telCli,
        adresseCli: this.state.adresseCli,
      })
    })
    .then(res => res.json())
            .then(item => {
                this.props.addItemToState(item);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
  
  componentDidMount(){
    if(this.props.item){
        const { id, nom, adresseLocal, label} = this.props.item
        this.setState({ id, nom, adresseLocal, label})
      }
      console.log("article id "+this.state.id)
    console.log(this.state.id)
    console.log(this.state.nom)
    this.getOptions()    

  }
  
  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} onInvalidSubmit={this.handleInvalidSubmit}>
        <FormGroup>
        <Label for="adresseLocal">Article</Label>

        <div>
        <Select name="articleId" id="articleId" options={this.state.options} onChange={this.handleChange.bind(this)}  />
    <p>Vous avez sélectionné <strong>{this.state.nomA} </strong> ID {this.state.article_id}</p>
      </div>

        </FormGroup>
        <FormGroup>
          <Label for="qte">Quantité</Label>
          <Input type="qte" name="qte" id="qte" onChange={this.onChange} value={this.state.qte === null ? '' : this.state.qte}  required/>

        </FormGroup>
      
        <Button >Ajouter</Button>
      </Form>
    );
  }
}

export default AddForm