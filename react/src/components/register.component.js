import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const nom = value => {
  if (value.length < 4 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalide nom.
     </div>
    );
  }
};

const prenom = value => {
  if (value.length < 4 || value.length > 100) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalide prenom.
      </div>
    );
  }
};

const tel = value => {
  if (value.length !=8) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalide téléphone.
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
Invalide email .
      </div>
    );
  }
};

const vemail = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Invalide email.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">

Le mot de passe doit avoir entre 6 et 40 caractères.       </div>
    );
  }
};
const role = value => {
  if (value.length < 2 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid role.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeNom = this.onChangeNom.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);

    this.onChangeTel = this.onChangeTel.bind(this);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);


    this.state = {
      nom: "",
      prenom: "",
      tel: "",
      email: "",
      password: "",
      role :"",
      successful: false,
      message: ""
    };
  }

  onChangeNom(e) {
    this.setState({
      nom: e.target.value
    });
  }
  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }
  onChangeTel(e) {
    this.setState({
      tel: e.target.value
    });
  }
   
  getAllUser(){
    let user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:4000/users',{   
      headers: {
        'Content-Type': 'application/json',
      }})
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeRole(e) {
    this.setState({
      role: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      
      AuthService.register(
        this.state.nom,
        this.state.prenom,
        this.state.tel,
        this.state.email,
        this.state.password,
        "sous-administrateur"
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }
  componentDidMount(){
    this.getAllUser()

  }

  render() {
    return (
           <div className="col-md-12">
          <div><br></br>
          <br></br>
          <br></br>
        </div> 
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Nom"
                    name="nom"
                    value={this.state.nom}
                    onChange={this.onChangeNom}
                    validations={[required, nom]}
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Prenom"
                    name="prenom"
                    value={this.state.prenom}
                    onChange={this.onChangePrenom}
                    validations={[required, prenom]}
                  />
                </div>
                
                <div className="form-group">
                  <Input
                    type="number"
                    className="form-control"
                    placeholder="Numéro de téléphone"
                    minlength="8" maxlength="8"
                    name="tel"
                    value={this.state.tel}
                    onChange={this.onChangeTel}
                    validations={[required, tel]}
                  />
                </div>
                <div className="form-group">
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    placeholder="Nom.Prenom@exemple.com"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, vemail]}
                  />
                </div>


                <div className="form-group">
                  <Input
                    type="password"
                    className="form-control"
                    placeholder="Mot de passe"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
             
                <div className="form-group">
                  <button className="btn">Ajouter</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
