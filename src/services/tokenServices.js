import axios from "axios";

const url="https://localhost:44303"

export async function token(){
    
    let playload={
        "username": "ifgroup",
        "password": "ifgroup2022"
      }

    try{
        let data=[];
        const response= await axios({
            url:`${url}/api/Login/login`,
            method:'POST',
            data:playload
        })
        if(response.status===200)
         data=response.data
         
        return data

    }catch(e){
        console.log(e)
    }

}