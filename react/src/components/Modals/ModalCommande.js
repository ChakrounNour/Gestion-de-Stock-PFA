import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FormCommande from '../Forms/FormCommande';
import EditIcon from '@material-ui/icons/Edit';
import AuthService from "../../services/auth.service";

class ModalCommande extends Component {
  state = {
    modal: false
}
toggle = () => {
    this.setState(previous => ({
        modal: !previous.modal
    }));
}
componentDidMount(){
    const user = AuthService.getCurrentUser();
    if (user) {
        this.setState({
            showResponsableDepot: user.role.includes("responsable de dépôt"),  
            showResponsable: user.role.includes("responsable de magasin"),
            showAdmin: user.role.includes("Admin"),
            showSousAdministrateur: user.role.includes("sous-administrateur"),
    
          });
    }
}
  render() {
    const { showResponsable , showResponsableDepot,showAdmin } = this.state; 

    const isNew = this.props.isNew;
    let title = 'Modifier Commande';
    let button = '';
    if (isNew && showResponsable) {
        title = 'Ajouter Commande';
        button =  <button type="button" onClick={this.toggle}
        class="btn-info">
            <i class="fa fa-plus" aria-hidden="true">
                </i> Commande </button>
    } else {
        showResponsable && showResponsableDepot (      button = <EditIcon

            onClick={this.toggle}></EditIcon>);
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <FormCommande
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;
}

}
export default ModalCommande