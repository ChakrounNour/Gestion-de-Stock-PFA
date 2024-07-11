import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditForm from '../Forms/FormAddEditClient'
import EditIcon from '@material-ui/icons/Edit';
import AuthService from "../../services/auth.service";

class ModalForm extends Component {
  state = {
    modal: false,
    showResponsableBoard: false,
    showAdminBoard: false,
    currentUser:false,
    showResponsableDepot:false
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
toggle = () => {
    this.setState(previous => ({
        modal: !previous.modal
    }));
}
  render() {
    const { showResponsableDepot , showResponsableBoard,showAdminBoard,showSousAdminBoard } = this.state; 

    const isNew = this.props.isNew;
    let title = 'Modifier Client';
    let button = '';
    if (isNew && showResponsableBoard) {

        title = 'Ajouter Client';
        button = 
            <button type="button" onClick={this.toggle}
             class="btn-info">
                 <i class="fa fa-plus" aria-hidden="true">
                     </i> Client</button>
  
    } else {
      showResponsableBoard &&(  button = <EditIcon
            onClick={this.toggle}></EditIcon>);
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <AddEditForm
                    addItemToState={this.props.addItemToState}
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;
}

}

export default ModalForm