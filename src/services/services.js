import axios from "axios";
import {token} from './tokenServices'

const url="https://localhost:44303"
  


 export async function getTask(){
    try{
        let data=[];
           
         console.log( )
             
        const response= await axios({
            url:`${url}/api/gettask`,
            method:'GET',
            headers: { Authorization: `Bearer ${await generateToken()}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
    }

}
export async function addTask(dataTAsk){
    try{
        let data=[];
        const response= await axios({
            url:`${url}/api/addtask`,
            method:'POST',
            data:dataTAsk,
            headers: { Authorization: `Bearer ${await generateToken()}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
    }

}
export async function updateTask(dataTAsk){
    try{
        let data=[];
        const response= await axios({
            url:`${url}/api/updatetask`,
            method:'PUT',
            data:dataTAsk,
            headers: { Authorization: `Bearer ${await generateToken()}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
    }

}
export async function deleteTask(idTask){
    try{
        let data=[];
        const response= await axios({
            url:`${url}/api/deletetask/${idTask}`,
            method:'DELETE',
            headers: { Authorization: `Bearer ${await generateToken()}` }
        })
        if(response.status===200)
         data=response.data

        return data

    }catch(e){
        console.log(e)
    }

}

async function generateToken(){
    
    let tokens = await token()
   
    return tokens.jwtToken
      
}