import { Modal } from 'bootstrap';
import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'
import ModalHist from '../Modals/ModalHist'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import AuthService from "../../services/auth.service";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class DataTable extends Component {
  constructor() {
    super();
    this.pageSize = 50;
    this.state = {
      itemsCommande:[],
      showResponsableBoard: false,
      showAdminBoard: false,
      showResponsableDepotBoard: false,
      showSousAdminBoard:false,
      currentUser: false,
    };
    this.CommandeState=this.CommandeState.bind(this)
    this.deleteItem=this.deleteItem.bind(this)
  }

  CommandeState =id =>{
    let user = JSON.parse(localStorage.getItem('user'));
    this.props.items.map(item => (
    fetch('http://localhost:4000/api/commande/'+id,{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
    .then(res => res.json())
    .then(res => this.setState({ itemsCommande: res }))
    .catch(err => console.log(err))))
  }
  deleteItem = id => {
    let user = JSON.parse(localStorage.getItem('user'));

    let confirmDelete = window.confirm('Supprimer définitivement cet élément?')
    if(confirmDelete){
      fetch('http://localhost:4000/api/client/'+id, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
      body: JSON.stringify({
        id
      })
    })
    .then(res => {
      this.props.deleteItemFromState(id);
    })
    .catch(err => console.log(err));
}
}
componentDidMount(){
  const user = AuthService.getCurrentUser();
  
  if (user) {
    this.setState({
      currentUser: user,
      showResponsableDepot: user.role.includes("responsable de dépôt"), 
      showResponsableBoard: user.role.includes("responsable de magasin"),
      showAdminBoard: user.role.includes("Admin"),
      showSousAdminBoard: user.role.includes("sous-administrateur"),

    });
  }
}

  render() {
  
    const items = this.props.items;
    const { showResponsableDepot , showResponsableBoard,showSousAdminBoard,showAdminBoard } = this.state; 
  
    const items2 = this.state.itemsCommande;
    console.log(items)
    return  <Table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th className="border-0">ID</th>
        <th className="border-0">Nom</th>
        <th className="border-0">Prenom</th>
        <th className="border-0">Téléphone</th>
        <th className="border-0">Adresse</th>
        <th className="border-0">Actions</th>

      </tr>
    </thead>
      <tbody>
        {!items || items.length <= 0 ?
          <tr>
            <td colSpan="6" align="center"><b>Pas de clients</b></td>
          </tr>
          : items.map(item => (

                          <tr key={item.id}>
              <th scope="row">
                {item.id}
              </th>
              <td>{item.nomCli}</td>
          <td>{item.prenomCli}</td>
          <td>{item.telCli}</td>
          <td>{item.adresseCli}</td>


              <td>
                
                <div>
          
                  <ModalForm
                    isNew={false}
                    item={item}
                    updateState={this.props.updateState} />
                     <ModalHist
                    isNew={false}
                    item={item}
                    CommandeState={this.props.CommandeState}
                    historiqueState={this.props.historiqueState} />
                 
                <DeleteOutlineIcon  onClick={() => this.deleteItem(item.id)}/> 
                </div>
              </td>
            </tr>

          ))}

      </tbody>
    </Table>;
  }
}
   
export default DataTable