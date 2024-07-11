import React, { Component } from 'react';
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
import DataTableInventaire from '../components/Tables/DataTableInventaire';

class Inventaire extends Component {
  state = {
    items: []
  }
  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/inventaire/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }

 

  componentDidMount(){
    this.getItems()
  }

  render() {
    return (

      <Container fluid>
<br></br>
<br></br>
<br></br>

        <Row>
          <Col md="12">

            <Card className="strpied-tabled-with-hover">
              
              <Card.Header>

                <Card.Title as="h4">Liste des inventaires</Card.Title>
                <p className="card-category">
                                </p>

              </Card.Header>

              <Card.Body className="table-full-width table-responsive px-0">
            <DataTableInventaire items={this.state.items}  />
     
           
              </Card.Body>
              </Card>
          </Col>
        
        </Row>
      </Container>
    )
  }
}

export default Inventaire