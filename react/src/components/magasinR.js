import { map } from 'jquery';
import React, { Component } from 'react';
import { Container, Row, Col ,Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ModalM from './Modals/ModalM';
import ModalR from './Modals/ModalR';

import DataTableM from './Tables/DataTableM';

class MagasinR extends Component {
  constructor() {
    
    super();

    // create data set of random length
  

    this.pageSize = 50;

    this.state = {
      currentPage: 0
    };
    
  }

  handleClick(e, index) {
    
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    
  }

  state = {
    items: [],

  }
  getItems(){
    var loopData=[], stockUser=[]
    var id=0,nom="",adresseLocal="",nomZ="",userId=0,zoneId=0
    let user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/magasin/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => res.map(r =>(
        id=r.id,
        nom=r.nomS,
        adresseLocal=r.adresseLocal,
        nomZ=r.zone.nomZ,
        zoneId=r.zoneId,
        userId=r.userId,
        stockUser=r.stockUser,
        loopData.push({id,nom,adresseLocal,nomZ,userId,zoneId,stockUser}))))
      .then(res => this.setState({ items: loopData }))
     
      .catch(err => console.log(err));

    
       
  }
  historiqueState = (id) => {
    this.getItems()
  }

  addItemToState = (item) => {
   /* this.setState(previous => ({
      items: [...previous.items, item]
    }));*/
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
    const { currentPage } = this.state;

    return (

      <Container className="magasin">
 <Row><Col><br></br> <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Col></Row>
              <Row>
          <Col>
          <ModalR buttonLabel="Add responsable" isNew={true} />
          &nbsp;&nbsp;&nbsp;
            <ModalM buttonLabel="Add magasin" isNew={true} addItemToState={this.addItemToState}/>
         

            </Col>
        </Row>
        <br></br>

        <Row>
          <Col>
            <DataTableM items={this.state.items} updateState={this.updateState} historiqueState={this.historiqueState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <div className="pagination-wrapper">
          
          <Pagination aria-label="Page navigation example">
            
            <PaginationItem disabled={currentPage <= 0}>
              
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage - 1)}
                previous
                href="#"
              />
              
            </PaginationItem>

            {[...Array(this.pagesCount)].map((page, i) => 
              <PaginationItem active={i === currentPage} key={i}>
                <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
              
              <PaginationLink
                onClick={e => this.handleClick(e, currentPage + 1)}
                next
                href="#"
              />
              
            </PaginationItem>
            
          </Pagination>
          
        </div>
      </Container>
    )
  }
}

export default MagasinR