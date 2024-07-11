import React, { Component, Fragment } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import axios from "axios";
import  jsPDF  from  'jspdf'
import ChartistGraph from "react-chartist";
import { Link } from "react-router-dom";
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
import cellEditFactory from 'react-bootstrap-table2-editor';
import DeleteIcon from '@material-ui/icons/Delete';
import {Modal } from 'react-bootstrap';


import filterFactory, {
  selectFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import ToolkitProvider, {
  CSVExport,
  Search,
} from "react-bootstrap-table2-toolkit";

const reload=()=>window.location.reload();

const { SearchBar } = Search;

const ExportCSV = (props) => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    <span>
     
    </span>
  );
};
class Inventaire extends Component {
  constructor(props) {
    super();
    this.state = {
      isOpen: false,
      selectOptions:'',
      selectedRow: null,
      items: [],
      selectOptions : [],
      valeur: '',
      dateI: '',
      annee:'',
      id: 0,
      image : '',
      nomA : '',
      prixTTC : '', 
      etat: '',
      originalData: [],
      filteredData: [] ,
     itemsDepot:[],article_id:'',
     count: 0


    };
  }
    
 
openModel = ()=>this.setState({isOpen:true});
closeModel = ()=>this.setState({isOpen:false});

  getItems(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/api/article',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())

      .then(items => this.setState({items}))
      .then(items => console.log(items))

      .catch(err => console.log(err))
  }
  
  getRapport(){
    let user = JSON.parse(localStorage.getItem('user'));
    var valeur
    fetch('http://localhost:4000/api/inventaire_art/rapport/131/',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(response => response.json())

      .then(Rapport => this.setState({Rapport}))
      .then(Rapport => console.log(Rapport))

      .catch(err => console.log(err))
    
    
     
  }
  
 componentDidMount(){
    this.getItems()
    this.setState({
      originalData: this.state.items,
      filteredData: this.state.items
    });
    this.getRapport()
    document.title = `Vous avez cliqué ${this.state.count} fois`;

  }

  componentDidUpdate() {
    document.title = `Vous avez cliqué ${this.state.count} fois`;
  }
 
  render() 
  {
    const items = this.state.items;
    const rapport=this.state.Rapport
    console.log(rapport)
    console.log(this.state.items)
   


    return (
      <>


      <Container fluid>
<br></br>
<br></br>
<br></br>

        <Row>
         
    
<Col md="6">
<Card>
  <Card.Header>
    <Card.Title as="h4">Rapport Commande au fil de temps</Card.Title>
    <p className="card-category">All products including Taxes</p>
  </Card.Header>
  <Card.Body>
    
    <div className="ct-chart" id="chartActivity">
      <ChartistGraph
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "Mai",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          series: [
            [
              542,
              443,
              320,
              780,
              553,
              453,
              326,
              434,
              568,
              610,
              756,
              895,
            ],
            [
              412,
              243,
              280,
              580,
              453,
              353,
              300,
              364,
              368,
              410,
              636,
              695,
            ],
          ],
        }}
        type="Bar"
        options={{
          seriesBarDistance: 10,
          axisX: {
            showGrid: false,
          },
          height: "245px",
        }}
        responsiveOptions={[
          [
            "screen and (max-width: 640px)",
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
      <i className="fas fa-circle text-info"></i>
      Tesla Model S <i className="fas fa-circle text-danger"></i>
      BMW 5 Series
    </div>
    <hr></hr>
    <div className="stats">
      <i className="fas fa-check"></i>
      Data information certified
    </div>
  </Card.Footer>
</Card>
</Col>
        
<Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Rapport de vente par article</Card.Title>
                <p className="card-category">Last ...</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                  <ChartistGraph
                    data={{
                      labels: [],
                      series: [56, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Open <i className="fas fa-circle text-danger"></i>
                  Bounce <i className="fas fa-circle text-warning"></i>
                  Unsubscribe
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
    );
  }
}
export default Inventaire;