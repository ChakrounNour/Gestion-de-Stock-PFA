import React , {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp,faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import {  pageTraffic, pageRanking } from "../views/Tables";
import {

  Container
} from "react-bootstrap";
const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};


class PageTrafficTable extends Component {
  state = {
    itemsAdmin: [],

  }
getTabAdmin(){
  let user = JSON.parse(localStorage.getItem('user'));

  fetch('http://localhost:4000/api/resume/tabAdmin',{   
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    }})
    .then(res => res.json())
    .then(res => this.setState({ itemsAdmin: res }))
    .then(res => console.log(this.state.itemsAdmin))
    .catch(err => console.log(err));
}
componentDidMount(){
  this.getTabAdmin()
}

  render(){
    const items=this.state.itemsAdmin

    console.log(items)
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (

    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-10">
        <Table responsive className="table-centered table-nowrap rounded mb-10">
          <thead className="thead-light">
            <tr>
            <th className="border-0">#</th>
            <th className="border-0">Image Article</th>

              <th className="border-0">Nom Article</th>
              <th className="border-0">Article vendu</th>
              <th className="border-0">Ventes brutes</th>
              <th className="border-0">% du total</th>

            </tr>
          </thead>
          <tbody>
            {  items.map(el => (
              <tr key={
                el.id
              }>
                <th scope="row">
                &nbsp; 
                </th>
              
                <td>
                <img alt="scan"  width="120" height="120" src={'http://localhost:4000/uploads/'+el.image} />
</td>
                <td>{
                  el.nomA
                }</td>
                  <td>{
                  el.vendu
                }</td>
                 <td>{
                  el.vente.toFixed(2)
                }</td>
           <td>
           <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{el.pourcentage}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={el.pourcentage} min={0} max={100} />
            </Col>
          </Row>
        </td>
                <td>                               <FontAwesomeIcon icon={10} />
</td>
                </tr>

          ))}



          </tbody>
        </Table>
      </Card.Body>
    </Card>

  );

}
};
export default PageTrafficTable ;