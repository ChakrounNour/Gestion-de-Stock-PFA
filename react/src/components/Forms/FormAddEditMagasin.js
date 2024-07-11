import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select'
import axios from 'axios'
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const nom = value => {
  if (value.length < 4 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalide nom.
     </div>
    );
  }
};

class AddEditFormM extends React.Component {
  state = {
    id: 0,
    email:'',
    adresseLocal: '',
    nom: '',
    nomZ:'',
    userId:'', 
    OptionsZones:[],
  }
  async getOptions(){
    let user = JSON.parse(localStorage.getItem('user'));
    const res =  await axios.get('http://localhost:4000/users/getResponsableMagasin',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
    })
    const data = res.data
    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.email

    }))

    this.setState({selectOptions: options})

  }
  async getZones(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/zone',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data

    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.nomZ

    }))

    this.setState({OptionsZones: options})

  }
  handleChange(e){
    this.setState({userId:e.value, email:e.label})
   }
   handleChange2(e){
    this.setState({zoneId:e.value, nomZ:e.label})
   }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
 
  submitFormEdit = e => {
    let user = JSON.parse(localStorage.getItem('user'));

    e.preventDefault()
    
    fetch('http://localhost:4000/api/magasin/'+this.state.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'put',
      body: JSON.stringify({
        id: this.state.id,
        nom: this.state.nom,
        adresseLocal: this.state.adresseLocal,
        userId: this.state.userId,
        zoneId: this.state.zoneId

      })
    })
    .then(() => {
      this.props.toggle();
      this.props.updateState(this.state.id);
  })
  .catch(err => console.log(err));
}

  submitFormAdd = e => {
    let user = JSON.parse(localStorage.getItem('user'));

    e.preventDefault()
    fetch('http://localhost:4000/api/magasin/'+this.state.userId+'/'+this.state.zoneId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        nom: this.state.nom,
        adresseLocal: this.state.adresseLocal,
        zoneId: this.state.zoneId  })
    })
    .then(res => res.json())
    .then(res => 

      fetch('http://localhost:4000/api/stock/'+res.id+'/'+this.state.userId, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        },
        method: 'post',
        body: JSON.stringify({
          user_Id: this.state.userId,
          stock_id:res.id
  
  
        })
      }))
        .then(res => res.json())
        
      
 
    .then(item => {
      console.log(item)
        this.props.addItemToState(item);
        this.props.toggle();
    })
    .catch(err => console.log(err));
}
  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { id, nom, adresseLocal,nomZ,email,userId,zoneId } = this.props.item
      this.setState({ id, nom, adresseLocal,nomZ,email,userId,zoneId})}
      this.getOptions()
      this.getZones()

    }
 
  render() {
    console.log(this.state.selectOptions)
    return (
      <Form  onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} >
        <FormGroup>
          <Label for="nomM">Nom Magasin</Label>
          <Input type="text" name="nom" id="nom" onChange={this.onChange}
           value={this.state.nom === null ? '' : this.state.nom}
           validations={[required, nom]}
           />

        </FormGroup>
        <FormGroup>
          <Label for="adresseLocal">Adresse local</Label>
          <Input type="text" name="adresseLocal" id="adresseLocal" onChange={this.onChange} value={this.state.adresseLocal === null ? '' : this.state.adresseLocal}   />

        </FormGroup>
        <FormGroup>
        <Label for="adresseLocal">Zone</Label>

        <div>
        <Select name="zoneId" id="zoneId" options={this.state.OptionsZones} 
        onChange={this.handleChange2.bind(this)}  />
    <p>Vous avez sélectionné <strong>{this.state.nomZ} </strong> ID {this.state.zoneId}</p>
      </div>

        </FormGroup>
        <FormGroup>
        <Label for="adresseLocal">Responsable de magasin</Label>

        <div>
        <Select name="userId" id="userId" options={this.state.selectOptions} onChange={this.handleChange.bind(this)} required />
    <p>Vous avez sélectionné <strong>{this.state.email} </strong> ID {this.state.userId}</p>
      </div>

        </FormGroup>
        <Button class="btn btn-secondary">Valider</Button>
      </Form>
      
    );
  }
}

export default AddEditFormM