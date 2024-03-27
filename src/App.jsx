import { useState,useEffect} from 'react'
import Navbar from './components/Navbar'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';


function App() {
  
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        let todos = JSON.parse(todoString);
        setTodos(todos);
      } catch (error) {
        console.error("Error parsing todos from local storage:", error);
        // Handle error, e.g., clear local storage or set default todos
      }
    }
  }, []);
  
  
  
  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  const handleEdit = (e,id)=>{
   let t= todos.filter(i=>i.id===id)
   setTodo(t[0].todo) 
   let newTodos= todos.filter(item=>{
    return item.id!==id  
    })
    
    setTodos(newTodos)
    saveToLS(newTodos)
  }
  
  const handleDelete = (e, id)=>{
    let newTodos= todos.filter(item=>{
    return item.id!==id  
    })
    
    setTodos(newTodos)
    saveToLS(newTodos)
   }
    
  
  const handleAdd = ()=>{
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS([...todos, {id:uuidv4(), todo, isCompleted: false}])
  }
  
  const handleChange = (e)=>{
    
    setTodo(e.target.value)
    
  }
  
  const handleCheckbox = (e) => { 
    let id =  e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;  
    })
    let newTodos= [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
   }


  return (
    <>
     <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-blue-400 min-h-[80vh]">
          <div className="addTodo my-5">
            <h2 className='text-lg font-bold'>Add a Todo</h2>
            <input  onChange={handleChange} value={todo} type="text"  id=""  className='w-1/2 rounded-full h-10 text-xl'/>
            <button onClick={handleAdd} disabled={todo.length<=3} className='bg-green-500 hover:bg-red-700 text-white p-2 py-1 text-sm font-bold rounded-md m-6 w-1/12 h-12 disabled:bg-blue-600'>Save</button>
          </div>
          <h2 className='text-lg font-bold'>your Todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='my-7 text-xl '>No Todos To Display</div>}
            {todos.map(item =>{
              
            
            return <div key={item.id} className="todo flex w-1/2 my-3 justify-between">
              <div className='flex gap-5'>
                
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e, item.id)} className='bg-lime-500 hover:bg-blue-600 text-white p-2 py-1 text-sm font-bold rounded-md mx-2 '><FaRegEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}}  className='bg-pink-600 hover:bg-blue-600 text-white p-2 py-1 text-sm font-bold rounded-md mx-2  '><MdDelete /></button>
                
              </div>
            </div>
            })}
          </div>
          
      </div>
    </>
  )
}

export default App
