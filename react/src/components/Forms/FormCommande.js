import React from 'react';
import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';  
import Select from 'react-select';

class FormCommande extends React.Component {
      
  constructor(props){  
    super(props)  
    this.state = {  
      id:"0",
      OptionsArticle:[],
      OptionsClient:[],

      valueNon:'',
      transporteurOui:'',
      successful: false,
      message: ""
    }  
        this.handleChang = this.handleChang.bind(this);
        this.handleChangA = this.handleChangA.bind(this);

        this.handleInvalidSubmit = this.handleInvalidSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);

    
    }
    handleChangA(e){
      this.setState({article_Id:e.value, nomA:e.label})
     }
  handleChang(e){
    this.setState({client_Id:e.value, nomCli:e.label})
   }

   handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
console.log("n"+name)
console.log("v"+value)
if (event.currentTarget.value=="Oui"){
this.setState({
  transporteurOui: event.currentTarget.value
  })
  }else{
    this.setState({
      valueNon: event.currentTarget.value
      });
  }
}
  handleInputChangeNon(event){
   
    this.setState({
      valueNon: event.currentTarget.value
      });
   
  }
     
  async getArticle(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/article/',  
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
  
    this.setState({OptionsArticle: options})
  
  }
  async getClient(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/client/',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    const options = data.map(d => ({
      "value" : d.id,
      "label" : d.nomCli + " " +d.prenomCli
  
    }))
  
    this.setState({OptionsClient: options})
  
  }
  

  handleInvalidSubmit(event, errors, values) {
    this.setState({errors, values});
  }
  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  

 
  submitFormAdd = e => {
    var qte=0
    var date=null
    var value=""
    console.log("transpor"+this.state.transporteurOui)
    console.log("transpor"+this.state.valueNon)
    if (this.state.transporteurOui=="Oui")
      value="Oui"
    else if (this.state.valueNon=="Non")
      value="Non"
    console.log(value)
    e.preventDefault()
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/commande/'+this.state.client_Id+'/'+value+'/'+this.state.article_Id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        dateC: this.state.dateC,
        montant: this.state.montant,
        qteC:this.state.qteC

      })
    })
    .then(res => res.json())
    .then(res => this.setState({ commande: res }))
    .then(
      (res) => {
    console.log(this.state.commande)


    qte=this.state.qteC

    date=this.state.date

    fetch('http://localhost:4000/api/qte_commander/'+this.state.article_Id+'/'+this.state.commande.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      method: 'post',
      body: JSON.stringify({
        qteC: qte,


      })
    })
    .then(res => res.json())
    .then(res=>console.log(res))

  })

            .then(item => {
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
  componentDidMount(){
    // if item exists, populate the state with proper data
    this.getArticle()
    this.getClient()
    if(this.props.item){
      const { id, nom, prenom, tel ,email,password,role} = this.props.item
      this.setState({ id, nom, prenom, tel ,email,password,role})
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd} onInvalidSubmit={this.handleInvalidSubmit}>
            <FormGroup row>  
          <Label for="text" sm={2}>Client</Label>  
          <Col sm={10}>  
          <Select name="categorieSId" id="categorieSId" options={this.state.OptionsClient} onChange={this.handleChang.bind(this)} value={this.state.id} />
    <p>Vous avez sélectionné <strong>{this.state.nomCli} ID {this.state.client_Id}  </strong> </p>
          </Col>  
        </FormGroup> 
        <FormGroup row>  
          <Label for="text" sm={2}>Article</Label>  
          <Col sm={10}>  
          <Select name="categorieSId" id="categorieSId" options={this.state.OptionsArticle} onChange={this.handleChangA.bind(this)} value={this.state.id} />
    <p>Vous avez sélectionné <strong>{this.state.nomA} ID {this.state.article_Id}  </strong> </p>
          </Col>  
        </FormGroup> 
        <FormGroup row>
        <Label for="text" sm={2}>Date</Label>
        <Col sm={10}>  
  
          <Input type="date" name="dateC" id="dateC" onChange={this.onChange} value={this.state.dateC === null ? '' : this.state.dateC} required />
        </Col>
        </FormGroup>
        <FormGroup row>
        <Label for="text" sm={2}>Quantité</Label>
        <Col sm={10}>  
  
          <Input type="qteC" name="qteC" id="qteC" onChange={this.onChange} value={this.state.qteC === null ? '' : this.state.qteC} required />
        </Col>
        </FormGroup>
              <FormGroup row>
        <Label for="text" sm={2}>Transporteur</Label>
        <Col sm={10}>  
    <div>
    <Input type="radio" name="oui" 
                                   value="Oui" 
                                   checked={this.state.transporteurOui === "Oui"} 
                                   onChange={this.handleInputChange} />          
                                   <Label for="oui">Oui</Label>
        </div>
        <div>
        <Input type="radio" name="non" 
                                   value="Non" 
                                   checked={this.state.valueNon === "Non"} 
                                   onChange={this.handleInputChange} />          
                                   <Label for="Non">Non</Label>
        </div>
        </Col>
        </FormGroup>
                
        <Button type="submit"  class="btn btn-primary" >Valider</Button>
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

export default  FormCommande