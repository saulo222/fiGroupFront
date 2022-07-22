import React, { useState, useEffect } from 'react';
import './globals.css';
import Header from './header/header.js'
import {getTask} from './services/services'
import {addTask} from './services/services'
import {updateTask} from './services/services'
import {deleteTask} from './services/services'
import TableTask from './table/tableTask'
import ModalTask from './modal/modalTask'
import Swal from 'sweetalert2'


function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [checked, setChecked] = useState(false)
  const mainClass = 'is-light-mode'
  const [task,setTask]=useState([])
  const [search,setsearch]=useState("")

  function changeMedia(mq) {
    setDarkMode(mq.matches)
    setChecked(mq.matches)
  }

  useEffect(() =>  {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    mq.addListener(changeMedia)
    setDarkMode(mq.matches)
    setChecked(mq.matches)
     loadTask()
    return () => {
      mq.removeListener(changeMedia)
    }
  }, [])

  async function loadTask(){
    const response= await getTask()
    setTask(response)
  }
  async function saveTask(dataSave){
    let data={
      "nameTask":dataSave.nameTask,
      "state":(dataSave.stateTask!=0)?true:false
    }
    const response= await addTask(data)
    if(response.result)
      alertMessage("Guardo exitosamente","success")

    loadTask()
  }
  async function editTask(dataSave){
    let data={
      "idTask":dataSave.idtask,
      "nameTask":dataSave.nameTask,
      "state":(dataSave.stateTask!=0)?true:false
    }
     const response= await updateTask(data)
     if(response)
      alertMessage("Actualizado exitosamente","success")
    loadTask()
  }
  async function removeTask(idTask){
     const response= await deleteTask(idTask)
     if(response)
     alertMessage("Eliminado exitosamente","success")
    loadTask()
  }
 function alertMessage(title,icon){
    Swal.fire({
      icon: `${icon}`,
      title: `${title}`,
    })
 }
  const searching=(e)=>{
    setsearch(e.target.value)
  }
  let results =!search?task:task.filter((data)=> data.nameTask.toLowerCase().includes(search.toLowerCase()))

  return (
    
    <main className={mainClass}>
      <ModalTask 
      id='new'
      title='Nueva tarea'
      saveTask={saveTask}
      />
      <Header/>
        <div className="wrapper" >

        <label htmlFor="exampleInputEmail1" className="form-label">Nombre tarea</label>
            <input 
            type="text" 
            name="nameTaskFilter" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            onChange={searching}/>
        <button type="button" data-bs-toggle="modal" data-bs-target="#new" className="btn btn-outline-dark">Nueva tarea</button>
        </div>
        <TableTask
          data={results}
          editTask={editTask}
          removeTask={removeTask}
          />
    </main>
  )
}
export default App;
