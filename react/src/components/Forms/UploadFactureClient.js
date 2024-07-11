import React, { Component } from "react";
import UploadService from "../../services/file-upload.service";
import axios from "axios";

export default class UploadFactureClient extends Component {
  constructor(props) {
    super(props);
    this.selectFile = this.selectFile.bind(this);
    this.upload = this.upload.bind(this);

    this.state = {
      currentFile: undefined,
      previewImage: undefined,
      previewImageDetect:undefined,
      progress: 0,
      message: "",
      detectImage:'',
      imageInfos: [],
      fileDetect:undefined,
      load:false
    };
    this.upload=this.upload.bind(this)
    this.detect = this.detect.bind(this);
    this.selectFile=this.selectFile.bind(this);
    this.stocker=this.stocker.bind(this)

  }
   stocker(){
    let user = JSON.parse(localStorage.getItem('user'));
    // axios.post('http://localhost:4000/api/facture/client',{   
      // headers: {
      //   'Content-Type': 'application/json',
      //   'Authorization': 'Bearer ' + user.token
      // }})
    fetch('http://localhost:4000/api/facture/client',{   
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      }})
      .then(res => console.log(res))
      .catch(err => console.log(err))
    // axios.post('http://localhost:4000/api/facture/client',  
    // {headers: {
    // 'Content-Type': 'application/json',
    // 'Authorization': 'Bearer ' + user.token
    //   },
    //   })

 
  }
  componentDidMount() {
    UploadService.getFiles().then((response) => {
      this.setState({
        imageInfos: response.data,
      });
    });
  }

  selectFile(event) {
    this.setState({
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0]),
      progress: 0,
      message: ""
    });
    console.log(event.target.files[0])
  }
  componentDidUpdate(prevProps, prevState) {
    // Utilisation classique (pensez bien à comparer les props) :
 
    // if (this.state.detectImage!== prevState.detectImage ) 
    // this.setState({
    //   detectImage: this.state.detectImage
    //   })
        }
 async detect(){
    let user = JSON.parse(localStorage.getItem('user'));
    console.log(this.state.currentFilename)

    const res =  await axios.get('http://localhost:4000/detect/'+this.state.currentFilename,  
      {headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + user.token
      },
    })
    console.log(res.data)
      const data = res.data
      console.log(data)
      console.log(data.file)
      this.setState({fileDetect:data.file.filename})
      this.setState({detectImage: data})
      this.setState({
        previewImageDetect: URL.createObjectURL(this.state.currentFile)
      })
      // this.setState({

      //   previewImage: URL.createObjectURL(event.target.files[0]),
      //   progress: 0,
      //   message: ""
      // });
     console.log(this.state.detectImage)
  }
  onClick = () => {
    this.detect()
    this.setState({ load: true })

}
  upload() {
    this.setState({
      progress: 0,
    });
    // if (this.state.file ) {
    //   console.log(this.state.file)
    //   let data = new FormData();
    //   data.append("image", this.state.file);
    //   data.set("data", this.state.text);
    //   let user = JSON.parse(localStorage.getItem('user'));
    //   axios
    //     .post("http://localhost:4000/images/UploadFactureOCR", data ,
    //     {
    //       headers : {
    //         'Authorization': 'Bearer ' + user.token,
    //       }}
    //     )
       
    //     .then( console.log(data))
    //     }
    console.log(this.state.currentFile)
    UploadService.upload(this.state.currentFile, (event) => {
      this.setState({
        progress: Math.round((100 * event.loaded) / event.total),
      });
    })

      .then((response) => {
        console.log(this.state.progress)
        console.log(response)
        this.setState({
          currentFilename: response.data.file.filename,
        });
        this.setState({
          message: response.data.message,
        });
        console.log(this.state.message)
        return UploadService.getFiles();
      })
      .then((files) => {
        this.setState({
          imageInfos: files.data,
        });
      })
      // .catch((err) => {
      //   this.setState({
      //     progress: 0,
      //     message: "Could not upload the image!",
      //     currentFile: undefined,
      //   });
      // });
  }
  render() {

    const {
      currentFile,
      previewImage,
      progress,
      message,
      imageInfos,
      detectImage,
      previewImageDetect,
      fileDetect
    } = this.state;
console.log("currentFile"+currentFile)
console.log("previewImage"+previewImage)
console.log("detectImage"+detectImage)
console.log("previewImageDetect"+previewImageDetect)
console.log("fileDetect"+fileDetect)

    return (
      <div>
        <div className="row">
          <div className="col-12">
              <input type="file" accept="image/*" onChange={this.selectFile} />
          </div>

       
        </div>

        {currentFile && (
          <div className="progress my-3">
            <div
              className="progress-bar progress-bar-info progress-bar-striped"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: progress + "%" }}
            >
              {progress}%
            </div>
          </div>
        )}
       <div className="card mt-3">
          <div className="card-header"></div>
        {previewImage && (
          <div>
            <img width="500" height="500"  className="preview" src={previewImage} alt="" />
          </div>
        )}
        </div>
        <div className="row">

       <div className="col-3">
            <button
              className="btn btn-success btn-sm"
              disabled={!currentFile}
              onClick={this.upload}
            >
              Upload
            </button>


          </div>
          <div className="col-3">

          <button   className="btn btn-success btn-sm" onClick={() => {this.detect()}}>
              Détecter
            </button>
            </div>
            <div className="col-3 ">

            <button   className="btn btn-success btn-sm" onClick={() => {this.stocker()}}>
              Stocker
            </button>
            </div>

          </div>
        {message && (
          <div className="alert alert-secondary mt-3" role="alert">
            {message}
          </div> 
        )}

  
    
            {/* <img className="preview" width="300" height="300" src={'http://localhost:4000/images/'+currentFile} alt=""/> */}
       {previewImageDetect && (
          <div>
            <img className="previewImageDetect" src={previewImageDetect} alt="" />
          </div>
        )}
        {detectImage && (
          <div>
            <img className="preview" src={detectImage} alt="" />
          </div>
        )}
     
      </div>
    );
  }
}
