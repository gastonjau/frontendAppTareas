

const FormularioCrear = ({tareas, setTareas}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.completed);
    fetch("https://aplicaciontareas-production.up.railway.app/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        description: e.target.description.value,
        completed: e.target.completed,
      }),
    }).then((response) => response.json())
    .then((data) => {
      setTareas([...tareas, data]);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-[912px] mx-auto p-6 bg-white rounded-lg shadow-lg mt-[20px]">
    
    <div>
        <label for="title" className="block text-lg font-medium text-gray-700">Título</label>
        <input 
            type="text" 
            name="title" 
            placeholder="Escribe Titulo" 
            className="mt-2 block w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600"
        />
    </div>

    
    <div>
        <label for="description" className="block text-lg font-medium text-gray-700">Descripción</label>
        <textarea 
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
            Agregar
        </button>
    </div>
</form>
  )
}

export default FormularioCrear