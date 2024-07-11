import axios from "axios";

const API_URL = "http://localhost:4000/api/magasin";

class MagasinService {
    getAll(id){
        let user = JSON.parse(localStorage.getItem('user'));

        return axios
        .get(API_URL + "/"+id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
              }})
    
        .then(response => {
       
  
          return response.data;
        });
     
     
  }


 
}

export default new MagasinService();
