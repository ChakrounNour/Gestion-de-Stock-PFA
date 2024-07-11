import React, { Component } from 'react'
import { Table, Button } from 'reactstrap';
import ModalM from '../Modals/ModalM'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ModalArticle from '../Modals/ModalArticle'
import FormArticleMag from '../Modals/FormArticleMag'
class DataTableM extends Component {
  

    deleteItem = id => {
      let user = JSON.parse(localStorage.getItem('user'));
  
      let confirmDelete = window.confirm('Supprimer définitivement cet élément?')
      if(confirmDelete){
        fetch('http://localhost:4000/api/magasin/'+id, {
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
      console.log(items);
 
      return  <Table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th className="border-0">ID</th>
          <th className="border-0">Nom</th>
          <th className="border-0">Adresse Local</th>
          <th className="border-0">Zone</th>
          <th className="border-0">Responsable</th>

          <th className="border-0">Actions</th>
        </tr>
      </thead>  
        <tbody>
          {!items || items.length <= 0 ?
            <tr>
              <td colSpan="6" align="center"><b>Pas de magasins</b></td>
            </tr>
            : items.map(item => (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.nom}</td>
                <td>{item.adresseLocal}</td>
                <td>{item.nomZ}</td>
                <td>{
                  item.stockUser.length>0? 
                  item.stockUser.map(i=> (    
                   i.email+" . "
                  )):
                  "Pas d'affectation de responsable"
                }
                </td>
                <td>
                  <div>
                  <FormArticleMag
                      isNew={false}
                      item={item}
                      updateState={this.props.updateState} />
                    <ModalM
                      isNew={false}
                      item={item}
                      updateState={this.props.updateState} />

                  <ModalArticle
                    isNew={false}
                    item={item}
                    CommandeState={this.props.CommandeState}
                    historiqueState={this.props.historiqueState} />
                    <DeleteOutlineIcon  onClick={() => this.deleteItem(item.id)}></DeleteOutlineIcon>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>;
    }
}


export default DataTableM