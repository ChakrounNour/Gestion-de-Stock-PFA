import React, { Component } from 'react';
import ChartistGraph from "react-chartist";
// react-bootstrap components
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp,faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import PageTrafficTable from "../views/Table";

class Dashboard extends Component {
  state = {
    items: [],
    pourcentages:[]
  }
  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/resume',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }
  getPourcentage(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/resume/pourcentage',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => res.json())
      .then(res => this.setState({ pourcentages: res }))
      .catch(err => console.log(err));
  }



  componentDidMount(){
    this.getItems()
    this.getPourcentage()
  }

  render() {
    var nf = new Intl.NumberFormat();

    const items=this.state.items
    var pour_count=0
    var pour_vente=0
    var pour_moyen=0
    const pourcentage=this.state.pourcentages
    {items.map(d => (
      pourcentage.map(d2 =>(
      d2.count>d.count?pour_count=((d.count*100)/d2.count):pour_count=(d2.count*100)/d.count,
      d2.vente>d.vente?pour_vente=(d.vente*100)/d2.vente:pour_vente=(d2.vente*100)/d.vente,
      d2.moyen>d.moyen?pour_moyen=(d.moyen*100)/d2.moyen:pour_moyen=(d2.moyen*100)/d.moyen)
      )
    )
    )}
    const  valueTxtColor = 50 >0? "text-danger" : "text-success";
    const valueIcon = 50 >0? faAngleDown : faAngleUp;
    const ValueChange = ({ value, suffix }) => {
    const valueIcon = value < 50 ? faAngleDown : faAngleUp;
    const valueTxtColor = value < 50 ? "text-danger" : "text-success";
    
      return (
        value ? <span className={valueTxtColor}>
          <FontAwesomeIcon icon={valueIcon} />
          <span className="fw-bold ms-1">
            {Math.abs(value)}{suffix}
          </span>
        </span> : "--"
      );
    };
  return (
    <>
      <Container fluid>
     
      <h3>Résumé ventes</h3>
      Derniers 30 jours
        <Row>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Ventes </p>
                      <p className="card-category">totales </p>
 
                    
                     {items.map(d => 
                      <Card.Title as="h4">{ d.vente==null? 0:d.vente.toFixed(1)} DT</Card.Title>
                     )}
                    
                     { pour_vente==0?

                    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      
      <span className="fw-bold ms-1">
 {pour_vente}
      </span>
    </span>:                  <ValueChange value={isNaN(pour_vente) ?0:pour_vente.toFixed(1)} suffix="%" />
  } 
              </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
               
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Nombre de commandes</p>
                      {items.map(d => 
                      <Card.Title as="h4">{d.count}</Card.Title>
                     )}                    
                       { pour_count==0?
                    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
     <input type="hidden" value={pour_count}/>

      </span>
    </span>:                  <ValueChange value={isNaN(pour_count)? null:pour_count.toFixed(2)} suffix="%" />
  } 
                     
                     </div>
   

                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
           
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="4" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Montant moyen des commandes</p>
                      {items.map(d => 
                      <Card.Title as="h4">{d.moyen} DT</Card.Title>
                     )}                    
                                { pour_moyen==1?
                    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
     <input type="hidden" value={(pour_moyen, 10)}/>

      </span>
    </span>:                  <ValueChange value={isNaN(pour_moyen)?0:pour_moyen.toFixed(2)} suffix="%" />
  } 
                     
                     
                     </div>
                   
                  </Col>

                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
             
              </Card.Footer>
            </Card>
          </Col>
      
        </Row>
       
   <h3>Articles les plus vendus</h3>

             <PageTrafficTable/>
     
      </Container>
    </>
  );
}
}
export default Dashboard;
