import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddEditFormDepot from '../Forms/FormAddEditDepot';
import EditIcon from '@material-ui/icons/Edit';

class ModalDepot extends Component {
  state = {
    modal: false
}
toggle = () => {
    this.setState(previous => ({
        modal: !previous.modal
    }));
}
  render() {
    const isNew = this.props.isNew;
    let title = 'Modifier Dépôt';
    let button = '';
    if (isNew) {
        title = 'Ajouter Dépôt';
        button = 
            <button type="button" onClick={this.toggle}
             class="btn-info">
                 <i class="fa fa-plus" aria-hidden="true">
                     </i> Dépôt</button>
      
    } else {
        button = <EditIcon

            onClick={this.toggle}></EditIcon>;
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
                <AddEditFormDepot
                    addItemToState={this.props.addItemToState}
                    updateState={this.props.updateState}
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
        </Modal>
    </Fragment>;
}

}
export default ModalDepot