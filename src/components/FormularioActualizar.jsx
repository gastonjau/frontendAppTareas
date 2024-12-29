import { useRef } from "react";


const FormularioActualizar = ({edit, tareas, setTareas, inputRef}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://aplicaciontareas-production.up.railway.app/api/tasks/${edit.id}`, {
      method: "PUT",
      body: JSON.stringify({
          title: e.target.title.value,
          description: e.target.description.value,
        }),
      headers: {
          "Content-Type": "application/json",
      }
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        let nuevaT = tareas.find((tarea) => tarea._id === edit.id);
        console.log(nuevaT);
        nuevaT.title = e.target.title.value;
        nuevaT.description = e.target.description.value;
        setTareas([...tareas]);
    });
  }

    const input2Ref = useRef(null);

    const handleFocus = () => {
      console.log(input2Ref);
      if (input2Ref.current) {
        const length = inputRef.current.value.length;
        input2Ref.current.focus();
        inputRef.current.setSelectionRange(length, length);
      }
    };


  const handleKey = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      handleFocus();
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-[912px] mx-auto p-6 bg-white rounded-lg shadow-lg mt-[20px]">
    
    <div>
        <label for="title" className="block text-lg font-medium text-gray-700">Título</label>
        <input 
          ref={inputRef} defaultValue={edit.title}
            type="text" 
            name="title" 
            placeholder="Escribe Titulo" 
            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
        />
    </div>

    
    <div>
        <label for="description" className="block text-lg font-medium text-gray-700">Descripción</label>
        <textarea 
        ref={input2Ref} defaultValue={edit.description}
            name="description" 
            placeholder="Escribe Descripción" 
            rows="4"
            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
        />
    </div>

    
    <div className="flex justify-center">
        <button 
            type="submit" 
            className="mt-4 px-6 py-2 bg-amber-400 text-white font-semibold rounded-md shadow-md hover:bg-amber-600 focus:outline-none "
        >
            Editar
        </button>
    </div>
</form>
  )
  
}

export default FormularioActualizar