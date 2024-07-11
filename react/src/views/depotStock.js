import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalDepot from '../components/Modals/ModalDepot';
import ModalResponsableDepot from '../components/Modals/ModalResponsableDepot';
import DataTableDepot from '../components/Tables/DataTableDepot';

class DepotStock extends Component {
  state = {
    items: []
  }
  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));
    var loopData=[]
    var id=0,nom="",adresseLocal="",nomZ="",email="",userId=0,zoneId=0,stock1=[],count=0,count1=0
    fetch('http://localhost:4000/api/depot/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
     .then(res => res.map(r =>(
       count=0,
        id=r.id,
        nom=r.nom,
        adresseLocal=r.adresseLocal,
        nomZ=r.zone.nomZ,
        zoneId=r.zoneId,
        stock1=r.stock1,
        (r.stock1.map(i => (
          count=count+(i.stock_article.qteArticle)  ))),
        loopData.push({id,nom,adresseLocal,nomZ,zoneId,stock1,count}))))
        .then(res => console.log( loopData))

      .then(res => this.setState({ items: loopData }))
      .catch(err => console.log(err));
  }

  addItemToState = (item) => {
  this.getItems()
  }

  updateState = (id) => {
    this.getItems();
  }
  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (

   
      <Container className="magasin">
 <Row><Col><br></br> <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Col></Row>
              <Row>
          <Col>
          <ModalResponsableDepot buttonLabel="Ajouter responsable" isNew={true} />
          &nbsp;&nbsp;&nbsp;
            <ModalDepot buttonLabel="Ajouter Depot" isNew={true} addItemToState={this.addItemToState}/>
            &nbsp;&nbsp;&nbsp;
            </Col>
        </Row>
        <br></br>

        <Row>
          <Col>
            <DataTableDepot items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
            </Col>
        </Row>
      
      </Container>
    )
  }
}

export default DepotStock