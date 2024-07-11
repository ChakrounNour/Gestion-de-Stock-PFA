import React, { Component } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

import './Notification.css';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.deleteNotificationHandler = this.deleteNotificationHandler.bind(this);
    }

    //setTimeout for removing notifications if has an expirration time 
    componentDidMount() {
        if (this.props.notification.expires) {
            setTimeout(() => {
                this.props.delete(this.props.notification.id);
            }, this.props.notification.expires);
        }
    }

    //update the componend if these conditions are met
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.notification.hasChanged) {
            return true;
        }

        if (this.props.notification.deleted) {
            return true;
        }
        return false;
    }

    //End

    //get current params and pass them to Notifications.js to execute delete
    //get current params and pass them to Notifications.js to execute delete
    deleteNotificationHandler = () => {
        let user = JSON.parse(localStorage.getItem('user'));
    
          fetch('http://localhost:4000/api/alerte/'+this.props.notification.id, {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.token
          },
          })
        .then(res => {
          this.props.deleteItemFromState(this.props.notification.id);
        })
        .catch(err => console.log(err));
    }

    render() {
        //variable for maintainance
        let propsNotification = this.props.notification;

        //removing 'New' if the notifications is old or already seen
        let isNew = ['NewNotif'];
        if (!propsNotification.new) {
            isNew.push('Hide');
        }

        let notification = null; //initial set of variable for controled render acording passed props
        if (!propsNotification.deleted) {
        
                if (propsNotification.title=='stock epuise'){
                    notification = (
                        <div className={this.props.class} >
                      
                            <div className='Notify-title '>{propsNotification.title}</div>
                                    <div className='Notify-text'>{propsNotification.description}</div>                        
                            <DeleteIcon className='material-icons Nofity-delete' onClick={this.deleteNotificationHandler} /></div>
                    )
                    }else if(propsNotification.title ==  'stock perime'){
                        notification = (
                            <div className={this.props.class} >
                             
                                    <div className='Notify-title '>{propsNotification.title}</div>
                                    <div className='Notify-text'>{propsNotification.description}</div>

                                <DeleteIcon className='material-icons Nofity-delete' onClick={this.deleteNotificationHandler} />
                            </div>
                        )
                      
            }
        }

        return (
            <React.Fragment>
                {notification}
            </React.Fragment>
        )
    }
}

export default Notification;