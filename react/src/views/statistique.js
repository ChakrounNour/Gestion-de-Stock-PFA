import React, { Component, Fragment } from "react";
import Select from 'react-select'
import axios from 'axios';  
import DynamicFilter from "./DynamicFilter"
import { AvForm, AvField } from "availity-reactstrap-validation";
import ChartistGraph from "react-chartist";
import  'jspdf-autotable'
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";


class Statistique extends Component {
  constructor(props) {
    super();
    this.state = {
      chart:[],
      OptionsFournisseur:[],
      selectOptions:'',
      selectOptions : [],
      options: [
        { label: "Derniers 30 jours", value: 2 },
        { label: "Les 3 derniers mois", value: 3 },
        { label: "Les 6 derniers mois", value: 4 },
        { label: "Les 12 derniers mois", value: 5 },

      ],
      OptionsCategorie:[],optionsMarque:[],    
      nomA : '',
      magasin_id:'',
      load:false,
     categorie:'',
     fournisseur:'',
     marque:'',
     zone:'',
     periode:'',
     nomZ:'',
     zoneId:'',
     nomC:'',
     marqueId:'',
     nomM:null,
     fournisseurId:'',
     nomF:'',
     categorieId:''

    };
  }
  async getCategorie(){
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
    this.setState({OptionsCategorie: options})
  }

  async getMarque(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/marque',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
    
    const options= data.map(d => ({
      "value" : d.id,
      "label" : d.nomM
  
    }))
  
    this.setState({optionsMarque: options})
  
  }
  
  async getFournisseur(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/fournisseur',  
    {headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    },
  })
    const data = res.data
  
    const options= data.map(d => ({
      "value" : d.id,
      "label" : d.nomF
  
    }))
  
    this.setState({OptionsFournisseur: options})
  
  }
  getStatMagasin(){
    let user = JSON.parse(localStorage.getItem('user'));

    if (this.state.nomZ==null && this.state.periode==null){
    fetch('http://localhost:4000/api/stat/all/all',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())

      .then(rapport => this.setState({rapport}))
      .then(rapport => console.log(rapport))
      .catch(err => console.log(err))
    }else if (this.state.periode!=null && this.state.nomZ==null){
      fetch('http://localhost:4000/api/stat/all/'+this.state.periode,{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(response => response.json())
  
        .then(rapport => this.setState({rapport}))
        .then(rapport => console.log(rapport))
        .catch(err => console.log(err))
    }else  if (this.state.periode!='' && this.state.nomZ!=null) {
      fetch('http://localhost:4000/api/stat/'+this.state.nomZ+'/'+this.state.periode,{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(response => response.json())
  
        .then(rapport => this.setState({rapport}))
        .then(rapport => console.log(rapport))
        .catch(err => console.log(err))
    } else if (this.state.periode=='' && this.state.nomZ!=null){
      
      fetch('http://localhost:4000/api/stat/'+this.state.nomZ+'/all',{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(response => response.json())
  
        .then(rapport => this.setState({rapport}))
        .then(rapport => console.log(rapport))
        .catch(err => console.log(err))
    }
    
     
  }
 
  onClick = () => {
    this.getDynamique()
    this.setState({ load: true })

}
  getStatMagasin2(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("p"+this.state.periode)
    console.log("z"+this.state.nomZ)
    fetch('http://localhost:4000/api/stat/all/all',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())

      .then(rapport => this.setState({rapport}))
      .then(rapport => console.log(rapport))
      .catch(err => console.log(err))}
  async getZones(){
    let user = JSON.parse(localStorage.getItem('user'));
  const res =  await axios.get('http://localhost:4000/api/zone/',  
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
  
    this.setState({options_zone: options})
  
  }
  getStatChiff(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("t"+this.state.nomM)
    console.log("c"+this.state.nomC)
    console.log("f"+this.state.nomF)
         if (this.state.nomF==''  && this.state.nomM==null && this.state.nomC!=null){
      console.log(" hhhh")
      fetch('http://localhost:4000/api/stat/'+this.state.nomC+'/all/all',{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(response => response.json())
    
        .then(rapport_periode => this.setState({rapport_periode}))
        .then(rapport_periode => console.log(rapport_periode))
    
        .catch(err => console.log(err))  
    }
    else    if (this.state.nomF=='' && this.state.nomC=='' && this.state.nomM!=null){
      fetch('http://localhost:4000/api/stat/all/all/'+this.state.nomM,{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(response => response.json())

        .then(rapport_periode => this.setState({rapport_periode}))
        .then(rapport_periode => console.log(rapport_periode))
    
        .catch(err => console.log(err))  
    }else
       if (this.state.nomF!=null && this.state.nomC!=null && this.state.nomM==null){
      fetch('http://localhost:4000/api/stat/'+this.state.nomC+'/'+this.state.nomF+'/all',{   
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + user.token
        }})
        .then(response => response.json())
  
        .then(rapport_periode => this.setState({rapport_periode}))
        .then(rapport_periode => console.log(rapport_periode))
  
        .catch(err => console.log(err))  
  }else     if (this.state.nomF!=null && this.state.nomC!='' && this.state.nomM!=null){
    fetch('http://localhost:4000/api/stat/'+this.state.nomC+'/'+this.state.nomF+'/'+this.state.nomM,{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())

      .then(rapport_periode => this.setState({rapport_periode}))
      .then(rapport_periode => console.log(rapport_periode))

      .catch(err => console.log(err))  
}else     if (this.state.nomF!=null && this.state.nomC!=null && this.state.nomM==''){
  fetch('http://localhost:4000/api/stat/'+this.state.nomF+'/'+this.state.nomC+'/all',{   
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    }})
    .then(response => response.json())

    .then(rapport_periode => this.setState({rapport_periode}))
    .then(rapport_periode => console.log(rapport_periode))

    .catch(err => console.log(err))  
}else     if (this.state.nomF!=null && this.state.nomC=='' && this.state.nomM==null){
  fetch('http://localhost:4000/api/stat/all/'+this.state.nomF+'/all',{   
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    }})
    .then(response => response.json())

    .then(rapport_periode => this.setState({rapport_periode}))
    .then(rapport_periode => console.log(rapport_periode))

    .catch(err => console.log(err))  
}
}

  getDynamique(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log("p"+this.state.nomF)
    console.log("z"+this.state.nomM)
    fetch('http://localhost:4000/api/stat/'+this.state.marqueId,{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())
      .then(response => this.setState({ chart: response }))

      .then(response => console.log(this.state.chart))
      .catch(err => console.log(err))} 
     
  
  getStatPeriode(){
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/stat/all/all/all',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())

      .then(rapport_periode => this.setState({rapport_periode}))
      .then(rapport_periode => console.log(rapport_periode))

      .catch(err => console.log(err))  
     
  }
  onChange(e){
   
    this.setState({periodeId:e.value, periode:e.label})
   }
   onChangeF(e){

    this.setState({fournisseurId:e.value, nomF:e.label})
    console.log(this.state.nomF)

   }
   onChangeM(e){
    this.setState({marqueId:e.value, nomM:e.label})
    console.log(this.state.nomM)
    //document.body.style.background = 'red';

   }
   onChangeC(e){
    this.setState({categorieId:e.value, nomC:e.label})
    console.log(this.state.nomC)
   }
   handleChange(e){
    this.setState({zoneId:e.value, nomZ:e.label})

   }
 componentDidMount(){
    this.getZones()
    this.getFournisseur()
    this.getCategorie()
    this.getMarque()
    this.getStatMagasin2()
    this.getStatPeriode()


 
  }
  componentDidUpdate(prevProps,prevState) {
    if (prevState.nomM !== this.state.nomM) {
      console.log("marque")
      this.getStatChiff()
  }
  if (prevState.nomF !== this.state.nomF) {
    this.getStatChiff()
  }
  if (prevState.nomC !== this.state.nomC) {
    this.getStatChiff()
  }
    if (prevState.nomZ !== this.state.nomZ) {
        this.getStatMagasin()
    }
    if (prevState.periode !== this.state.periode) {
      this.getStatMagasin()
  }
 
}

 
  render() 
  {
    console.log(this.state.rapport_periode)
    const dynamic=this.state.chart
    var fournisseur=[],sum=[],marque=[]

    !dynamic || dynamic.length <= 0 ?
        <tr>
          <td colSpan="6" align="center"><b>No magasins yet</b></td>
        </tr>
        : dynamic.map(r => (
          marque.push(r.nomM),
          sum.push(r.sum),
          fournisseur.push(r.nomF)
        ))
    const rapp_periode=this.state.rapport_periode
    const rapport=this.state.rapport
    var CHA=[]
    var CHA_periode=[]
    var mois=[]
    console.log(rapport)
    !rapport || rapport.length <= 0 ?
        <tr>
          <td colSpan="6" align="center"><b>No magasins yet</b></td>
        </tr>
        : rapport.map(r => (
          
            CHA.push(r.CA.toFixed(2))
        ))


console.log(CHA)
!rapp_periode || rapp_periode.length <= 0 ?
<tr>
  <td colSpan="6" align="center"><b>No rapp_periode yet</b></td>
</tr>
: rapp_periode.map(r => (
  
  CHA_periode.push(r.CA),
  mois.push(r.MONTHNAME)
))

    return (
      <>
 
      <Container fluid>
<br></br>
<br></br>
<br></br>

        <Row>
         
      
<Col md="12,5">
<Card>
  <Card.Header>
    <Card.Title as="h4">Chiffre de vente</Card.Title>
    <p className="card-category">Fournisseur/ Categorie/ Marque</p>
  </Card.Header>
 
  <Card.Body>

                  <Row>
                  <Col sm="4">
                    Categorie:<br></br>
                    <div>
        <Select name="categorieId" maxMenuHeight={150}     menuPlacement="auto"  id="categorieId" options={this.state.OptionsCategorie} onChange={this.onChangeC.bind(this)}  />
      </div>
  
                    </Col>
                    <Col sm="4">
                    Fournisseur:<br></br>
                    <div>
        <Select name="fournisseurId" maxMenuHeight={150}       menuPlacement="auto"  id="fournisseurId" options={this.state.OptionsFournisseur} onChange={this.onChangeF.bind(this)}  />
      </div>
  
      
                    </Col>
                   
                    <Col sm="4">
                    Marque:<br></br>
                    <div>
        <Select name="marqueId" maxMenuHeight={150}     menuPlacement="auto"  id="marqueId" options={this.state.optionsMarque} onChange={this.onChangeM.bind(this)}  />
      </div>
                    </Col>
                  </Row>
                
                             <div id="simple-msg"></div>
   
     
   
     
    <div className="ct-chart" id="chartActivity">
      <ChartistGraph
        data={{
          labels: mois,
          series: [
            
              
            CHA_periode
            
          ],
        }}
        type="Bar"
        options={{
          seriesBarDistance: 20,
          axisX: {
            showGrid: false,
          },
          height: "300px",
          width: "1000px",

        }}
        responsiveOptions={[
          [
            "screen and (max-width: 800px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ]}
      />
    </div>
  </Card.Body>
  <Card.Footer>
    <div className="legend">
    </div>
    <hr></hr>
    <div className="stats">
 
    </div>
  </Card.Footer>
</Card>
</Col>
        
<Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Chiffre de vente par Magasin</Card.Title>
                <p className="card-category">Zone / Période</p>
              </Card.Header>
              <Card.Body>
         
              <AvForm
                  name="cform"
                  id="cform"
                  className="contact-form margin-t-20"
                  ref={(el) => (this.myFormRef = el)}
                  onSubmit={(e) => this.handleSubmit(e)}
                >
                  <Row>
                    <Col sm="6">
                    Zone:<br></br>
                    <div>
        <Select name="zoneId" maxMenuHeight={150}     menuPlacement="auto"  id="zoneId" options={this.state.options_zone} onChange={this.handleChange.bind(this)}  />
      </div>

        
                    </Col>
                    <Col sm="6">
                    Période:<br></br>
                    <div>
        <Select name="periode" maxMenuHeight={150}     menuPlacement="auto" id="periode" options={this.state.options} onChange={this.onChange.bind(this)}  />
      </div>
             
                    </Col>
           
                  </Row>
                
                             <div id="simple-msg"></div>
                </AvForm>
   
                <Col md="6">
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >    
                  { console.log(CHA) }
                  <ChartistGraph
                    data={{
                      labels: [],
                      series: CHA,
                    }}
                    type="Pie"
                  />
                </div>
                </Col>
                <Col md="6">

                <div className="">

                {!rapport || rapport.length <= 0 ?
              <tr>
                <td colSpan="6" align="center"><b></b></td>
              </tr>
              : rapport.map(r => (
                <tr key={r.CA}>
               {r.nom} :{ r.CA.toFixed(2)}

            </tr>
              ))}
                </div>
                </Col>
              
              </Card.Body>
            </Card>
          </Col>
    
          <Col md="12,5">
<Card>
  <Card.Header>
    <Card.Title as="h4">Graphique dynamique</Card.Title>
    <p className="card-category"> Marque / Fournisseur</p>
  </Card.Header>
 
  <Card.Body>

                  <Row>
                    <Col sm="4">
                    Marque:<br></br>
                    <div>
        <Select name="marqueId" maxMenuHeight={150}     menuPlacement="auto"  id="marqueId" options={this.state.optionsMarque} onChange={this.onChangeM.bind(this)}  />
      </div>
                    </Col>
                  
                  
                    <Col sm="4">
                
      <button class="btn" onClick={() => {this.onClick()}}>
      Valider
         </button>
                    </Col>
                  </Row>
                
                             <div id="simple-msg"></div>
   
     
   
     
                             <div className="ct-chart" id="chartActivity">
                         <div >
                             <ChartistGraph 
        data={{
          labels: fournisseur,
          series: [
            
              
            sum
            
          ],
        }}
        type="Bar"
        options={{
          seriesBarDistance: 20,
          axisX: {
            showGrid: false,
          },
          height: "300px",
          width: "1000px",
          interactivityEnabled: false,


        }}
        responsiveOptions={[
          [
            "screen and (max-width: 800px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ]}
      /></div>
    </div>
  </Card.Body>
  <Card.Footer>
    <div className="legend">
    </div>
    <hr></hr>
    <div className="stats">
 
    </div>
  </Card.Footer>
</Card>
</Col>
        </Row>
      </Container>
    </>
    );
  }
}
export default Statistique;