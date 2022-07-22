import React,{ useState, useEffect } from 'react'
import '../overview/overview.css'
import ModalTaskEdit from '../modal/modalTaskEdit'
import Swal from 'sweetalert2'


 const App = (props) => { 

const [editing,setEditing]=useState({
   idtask:0, nameTask:'',state:''
})

const editRow=(task)=>{
    setEditing({
        idtask:task.idTask,nameTask:task.nameTask,state:task.state
    })
}
async function updateTask(dataSave){
    props.editTask(dataSave)
}

const deleteRow=(idTask)=>{
    Swal.fire({
        title: 'Atención',
        text: "Esta seguro de eliminar el registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
        props.removeTask(idTask)
         
        }
      })
}
  return (
    
    <section className="overview">
        <ModalTaskEdit  
        id='update'
        title='Editar tarea'
        editing={editing}
        updateTask={updateTask}
        />
      <div className="wrapper">
    <table className="table table-hover" id="tableTask">
  <thead>
    <tr>
      <th scope="col">Tarea</th>
      <th scope="col">Estado</th>
      <th scope="col">Fecha creación</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
  {props.data.map((val) => 
           (
            <tr key={val.idTask}>
              <td>{val.nameTask}</td> 
              <td>{(val.state)?"Completado":"No Completado"}</td>
              <td>{val.dateCreate}</td>
              <td><button type="button" className="btn btn-outline-danger"  onClick={()=>{deleteRow(val.idTask)}} ><ion-icon name="trash-outline"></ion-icon></button>
              <button type="button" className="btn btn-outline-primary"  onClick={()=>{editRow(val)}} 
                 data-bs-toggle="modal" data-bs-target="#update"><ion-icon name="pencil-outline"></ion-icon></button></td>
            </tr>
          )
        )}
  </tbody>
</table>
    <nav aria-label="Page navigation example">
    <ul className="pagination">
        <li className="page-item">
        <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item"><a className="page-link" href="#">2</a></li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item">
        <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
        </a>
        </li>
    </ul>
    </nav>
</div>
</section>
  )
}

export default App