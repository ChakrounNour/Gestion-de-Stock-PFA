import React, { Component } from 'react';
import { Container, Row, Col ,Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import ModalForm from './Modals/Modal';
import DataTable from './Tables/DataTable';
import ModalHist from './Modals/ModalHist';
import ModalCommande from './Modals/ModalCommande';
import ModalFacture from './Modals/ModalFacture';
import FactureClient from './Modals/FactureClient';
class Client extends Component {
  constructor() {
    super();
    this.pageSize = 50;
    this.state = {
      currentPage: 0,
      items: [],
    };
    this.handleClick=this.handleClick.bind(this)
    this.getItems=this.getItems.bind(this)
    this.addItemToState=this.addItemToState.bind(this)    
    this.updateState=this.updateState.bind(this)   
    this.historiqueState=this.historiqueState.bind(this)
    this.deleteItemFromState=this.deleteItemFromState.bind(this)
  }

  handleClick(e, index) {   
    e.preventDefault();
    this.setState({
      currentPage: index
    });  
  }
  //get all client
  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));
      fetch('http://localhost:4000/api/client/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }
  //ajouter client au liste
  addItemToState = (item) => {
      this.getItems()
  }
  //modifier client de la liste
  updateState = (id) => {
    this.getItems();
  }
  //historique des clients
  historiqueState = (id) => {
    this.getItems()
  }
  //suppression d'un client de la liste
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
      <Container className="Client">
      <Row><Col><br></br> <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Col></Row>        <Row>
          <Col>
            <ModalForm buttonLabel="Add Item" isNew={true} addItemToState={this.addItemToState}/>
            &nbsp;&nbsp;&nbsp;
            <ModalCommande buttonLabel="Add Commande" isNew={true} />
            &nbsp;&nbsp;&nbsp;
            <ModalFacture buttonLabel="Add Facture" isNew={true} />
            &nbsp;&nbsp;&nbsp;
            <FactureClient buttonLabel="Add Facture client" isNew={true} />
          </Col>
        </Row>
        <br></br>

        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} historiqueState={this.historiqueState}  deleteItemFromState={this.deleteItemFromState} />
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

export default Client