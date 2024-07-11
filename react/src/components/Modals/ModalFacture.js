import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import FormCommandeFacture from '../Forms/FormCommandeFacture';
import EditIcon from '@material-ui/icons/Edit';
import AuthService from "../../services/auth.service";

class ModalFacture extends Component {
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
        showResponsable: user.role.includes("Responsable"),
        showAdmin: user.role.includes("Admin"),
        showSousAdministrateur: user.role.includes("sous-administrateur"),

      });
    }
}
  render() {
    const { showResponsable , showAdmin } = this.state; 

    const isNew = this.props.isNew;
    let title = 'Modifier Facture';
    let button = '';
    if (isNew && showResponsable) {
        title = 'Ajouter Facture';
        button =  <button type="button" onClick={this.toggle}
        class="btn-info">
            <i class="fa fa-plus" aria-hidden="true">
                </i> Facture </button>
    } else {
        showResponsable &&(      button = <EditIcon

            onClick={this.toggle}></EditIcon>);
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <FormCommandeFacture
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;
}

}
export default ModalFacture