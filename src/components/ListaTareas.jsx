

const ListaTareas = ({tareas, setTareas,tareasPendientes,tareasCompletadas,  paginacion, setEdit, handleFocus, handleSelectOption}) => {
    

    console.log();
    const handleEliminar = (id) =>{
        fetch(`https://aplicaciontareas-production.up.railway.app/api/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Eliminado");
        });
        setTareas((prevTareas) => prevTareas.filter((tarea) => tarea._id !== id));
    }
    const handleEstado = (id, estado) => {
        fetch(`https://aplicaciontareas-production.up.railway.app/api/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                completed: !estado,
              }),
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
        tareas.find((tarea) => tarea._id === id).completed = !estado;
        setTareas([...tareas]);
    }

    const handleEdit = (id) => {
        handleSelectOption();
        handleFocus();
        const tarea = tareas.find((tarea) => tarea._id === id);
        setEdit({
            id: tarea._id,
            title: tarea.title,
            description: tarea.description,
        });
    }

  return (
    <div className="h-[100vdh]">
        {
            paginacion == 1 &&
            tareas.map((tarea) => (
                <div className="w-[100vdw] bg-amber-300" key={tarea._id}>
                <div className="bg-amber-100 relative border border-black rounded-md py-[10px] px-[20px] my-[20px] max-w-[912px] m-auto">
                    <p className="absolute right-[10px] top-[5px] text-xs">{new Date(tarea.createdAt).toLocaleDateString() + " a las: " + new Date(tarea.createdAt).toLocaleTimeString() }</p>
                    <p className="inline-block px-2 my-[2px] text-sm font-medium text-white rounded-full bg-amber-200 shadow-md">{tarea.completed ? "Completada": "Pendiente"}</p><br />
                    <h2 className="font-semibold mb-[8px]">{tarea.title}</h2>
                    <p className="italic">{tarea.description}</p>
                    <div className="flex gap-[10px] mt-[10px] botones">
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600" onClick={() => handleEliminar(tarea._id)}>Eliminar</button>
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600" onClick={() => handleEstado(tarea._id, tarea.completed)}>Cambiar estado</button>
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600" onClick={() => handleEdit(tarea._id)}>Editar</button>
                    </div>
                </div>
                </div>
            ))
        }
        {
            paginacion == 2 &&
            tareasPendientes.map((tarea) => (
                <div className="bg-amber-100 relative border border-black rounded-md py-[10px] px-[20px] my-[20px] max-w-[912px] m-auto" key={tarea._id}>
                    <p className="absolute right-[10px] top-[5px] text-xs">{new Date(tarea.createdAt).toLocaleDateString() + " a las: " + new Date(tarea.createdAt).toLocaleTimeString() }</p>
                    <p className="inline-block px-2 my-[2px] text-sm font-medium text-white rounded-full bg-amber-200 shadow-md">{tarea.completed ? "Completada": "Pendiente"}</p><br />
                    <h2 className="font-semibold mb-[8px]">{tarea.title}</h2>
                    <p className="italic">{tarea.description}</p>
                    <div className="flex gap-[10px] mt-[10px]">
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => handleEliminar(tarea._id)}>Eliminar</button>
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => handleEstado(tarea._id, tarea.completed)}>Cambiar estado</button>
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => handleEdit(tarea._id)}>Editar</button>
                    </div>
                </div>
            ))
            
            
        }
        {
            paginacion == 3 && 
            tareasCompletadas.map((tarea) => (
                <div className="bg-amber-100 relative border border-black rounded-md py-[10px] px-[20px] my-[20px] max-w-[912px] m-auto" key={tarea._id}>
                    <p className="absolute right-[10px] top-[5px] text-xs">{new Date(tarea.createdAt).toLocaleDateString() + " a las: " + new Date(tarea.createdAt).toLocaleTimeString() }</p>
                    <p className="inline-block px-2 my-[2px] text-sm font-medium text-white rounded-full bg-amber-200 shadow-md">{tarea.completed ? "Completada": "Pendiente"}</p><br />
                    <h2 className="font-semibold mb-[8px]">{tarea.title}</h2>
                    <p className="italic">{tarea.description}</p>
                    <div className="flex gap-[10px] mt-[10px]">
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => handleEliminar(tarea._id)}>Eliminar</button>
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => handleEstado(tarea._id, tarea.completed)}>Cambiar estado</button>
                        <button className="px-2 text-white bg-amber-400 rounded-md shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => handleEdit(tarea._id)}>Editar</button>
                    </div>
                </div>
            
            ))
        }
    </div>
  )
}

export default ListaTareas