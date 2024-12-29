import { useEffect, useRef, useState } from "react";
import FormularioCrear from "./components/FormularioCrear";
import ListaTareas from "./components/ListaTareas";
import FormularioActualizar from "./components/FormularioActualizar";




function App() {
  const [tareas, setTareas] = useState([]);
  const [pendientes, setPendientes] = useState([]);
  const [completadas, setCompletadas] = useState([]);
  const [select, setSelect] = useState([]);
  const [paginacion, setpaginacion] = useState(1);
  const [edit, setEdit] = useState({
    id: "",
    title: "",
    description: "",
  });

  
  useEffect(() => {
    fetch("https://aplicaciontareas-production.up.railway.app/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTareas(data);
      });
  }, []);

  useEffect(() => {
    const nuevasPendientes = tareas.filter((tarea) => !tarea.completed);
    const nuevasCompletadas = tareas.filter((tarea) => tarea.completed);
    setPendientes(nuevasPendientes);
    setCompletadas(nuevasCompletadas);
  }, [tareas]);

  //Focus
    const inputRef = useRef(null);

    const handleFocus = () => {
      console.log(inputRef);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    //seleccionar select
    const selectRef = useRef(null);

    const handleSelectOption = () => {
      if (selectRef.current) {
        selectRef.current.value = "actualizar";
      }
      setSelect("actualizar");
    };



  return (
    <>
    <div className="bg-amber-300 w-screen h-screen p-0 m-0 z-10">
      <div className="container mx-auto p-[50px]">
        <h1 className="text-xl text-center font-bold pb-[20px]">Aplicación de tareas</h1>
        <div className="flex justify-center gap-[20px] ">
        <button className="p-2 hover:underline" onClick={() => setpaginacion(1)}>Todas</button>
        <button className="p-2 hover:underline" onClick={() => setpaginacion(2)}>Pendientes</button>
        <button className="p-2 hover:underline" onClick={() => setpaginacion(3)}>Completadas</button>
        </div>
        <br />
        <select className="m-auto max-w-[912px] block w-full py-2 pl-3 pr-10 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600" ref={selectRef} name="select" id="select" onChange={(e) => setSelect(e.target.value)}>
          <option defaultChecked>Selecciona una opción</option>
          <option value="crear" defaultChecked>Crear</option>
          <option value="actualizar">Actualizar</option>
        </select>
        {select == "crear" && <FormularioCrear tareas={tareas} setTareas={setTareas} />}
        {select == "actualizar" && <FormularioActualizar inputRef={inputRef} tareas={tareas} setTareas={setTareas} edit={edit}/>}
        <ListaTareas
          paginacion={paginacion}
          setTareas={setTareas}
          tareas={tareas}
          tareasPendientes={pendientes}
          tareasCompletadas={completadas}
          setEdit={setEdit}
          handleFocus={handleFocus}
          handleSelectOption={handleSelectOption}
        />
      </div>
    </div>
    </>
    
  );
}

export default App;
