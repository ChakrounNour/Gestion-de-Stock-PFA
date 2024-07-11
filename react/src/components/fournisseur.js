import React, { Component } from 'react';
import ModalF from './Modals/ModalF';
import DataTableF from './Tables/DataTableF';
import { Container, Row, Col ,Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import FactureFournisseur from './Modals/FactureFournisseur';

class Fournisseur extends Component {
  constructor() {
    
    super();
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
    items: []
  }

  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/fournisseur/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }


  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
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
        <Container className="Fournisseur">
          <Row><Col><br></br> <br></br>
        <br></br>
        <br></br>
        <br></br>
        </Col></Row>
        <Row>
            <Col>
              <ModalF buttonLabel="Add Item" isNew={true}  addItemToState={this.addItemToState}/>
              &nbsp;&nbsp;&nbsp;
              <FactureFournisseur buttonLabel="Add FactureFournisseur" isNew={true} />

            </Col>
          </Row>
          <br></br>
          <Row>
            <Col>
              <DataTableF items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
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

export default Fournisseur