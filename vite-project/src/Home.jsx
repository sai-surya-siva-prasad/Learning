import React,{ useState } from 'react'
import axios from 'axios'
function Home() {   
  const [todos,setTodos]=useState([])
  const[task,setTask]=useState()
  const handleAdd =()=>
  {
    axios.post('http://localhost:3001/add',{task:task})
    .then(result => console.log(result)).catch(err => console.log(err))
  }
    return (
        <div>
            <h2>Todo List</h2>
            <input type="text" placeholder="Enter Task" onChange={(e)=>setTask(e.target.value)}/>
            <button type="button" onClick={handleAdd}>ok</button> 
          {
            todos.length===0?
            <div>
              <h2> say Hi</h2>
              </div>:todos.map(todo=>
              <div>
                {todo}
                </div>)
          }
        </div>
    );
}

export default Home;
