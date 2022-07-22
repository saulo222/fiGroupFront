import React, { useState, Fragment } from 'react'
import '../overview/overview.css'
import { useForm } from 'react-hook-form'


const App = (props) => {

    const {register, errors, handleSubmit} = useForm();
    const listStataTask=[{label:"Completado",value:1} ,{label:"No Completado",value:0}]

    const messages = {
        nameTask: "Este campo es obligatorio",
        stateTask: "Este campo es obligatorio"
       };

    const [datos, setDatos] = useState({
        nameTask:'',
        stateTask:''
    });

    const imputChange=(event)=>{
        setDatos({
            ...datos,
            [event.target.name]:event.target.value
        })
    }

    const onSubmit =(event)=>{
       props.saveTask(datos)
       event.target.reset();
    }

return (

<div className="modal fade " id={props.id}  data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">{props.title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="modal-body">
        <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Nombre tarea</label>
            <input 
            type="text" 
            name="nameTask" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            {...register('nameTask', { required: {
                value: true, 
                message: ' es requerido'
                } })}
            onChange={imputChange}/>
      
        </div>
        <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Estado</label>
        <select className="form-select" onChange={imputChange} name="stateTask" aria-label="Default select example" {...register('stateTask', { required: {
                value: true, 
                message: ' es requerido'
                } })}>
                {listStataTask.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
        </select>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
        <button  type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar</button>
      </div>
      </form>
    </Fragment>
    </div>
  </div>
</div>
  )
}
export default App