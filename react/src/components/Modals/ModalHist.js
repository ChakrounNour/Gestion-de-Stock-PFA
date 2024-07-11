import React, { Component, Fragment } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import HistForm from '../Forms/HistForm';

import HistoryIcon from '@material-ui/icons/History';
class ModalHist extends Component {
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
    let title = 'Historique commandes ';
    let button = '';
    if (isNew) {
        title = 'Add User';
        button = <Button
            color="success"
            onClick={this.toggle}
            style={{ minWidth: "200px" }}>Add</Button>;
    } else {
        button = <HistoryIcon
            onClick={this.toggle} />;
    }
    return <Fragment>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog modal-lg" >
            <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
            <ModalBody>
            <HistForm
                   historiqueState={this.props.historiqueState}
                                    
                    toggle={this.toggle}
                    item={this.props.item} />
            </ModalBody>
             
        </Modal>
    </Fragment>;
}

}

export default ModalHist