import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalF from '../Modals/ModalF'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

class DataTableF extends Component {

  deleteItem = id => {
    let user = JSON.parse(localStorage.getItem('user'));

    let confirmDelete = window.confirm('Supprimer définitivement cet élément?')
    if(confirmDelete){
      fetch('http://localhost:4000/api/fournisseur/'+id, {
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


  render() {
    const items = this.props.items;
    return <Table className="table table-bordered table-striped">
    <thead>
      <tr>
        <th className="border-0">ID</th>
        <th className="border-0">Nom</th>
        <th className="border-0">Adresse Fournisseur</th>
        <th className="border-0">Matricule Fiscale</th>
        <th className="border-0">Actions</th>

      </tr>
    </thead>
      <tbody>
        {!items || items.length <= 0 ?
          <tr>
            <td colSpan="6" align="center"><b>Pas de fournisseurs</b></td>
          </tr>
          : items.map(item => (
            <tr key={item.id}>
              <th scope="row">
                {item.id}
              </th>
              <td>{item.nomF}</td>
          <td>{item.adresseF}</td>
          <td>{item.matriculeFiscale}</td>
              <td>
                <div>
                  <ModalF
                    isNew={false}
                    item={item}
                    updateState={this.props.updateState} />
                  &nbsp;&nbsp;&nbsp;
                  <DeleteOutlineIcon onClick={() => this.deleteItem(item.id)}></DeleteOutlineIcon>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>;
  }
}
export default DataTableF