import { useEffect, useState } from 'react'
import './todo.css'
export default function (){

    const [input,setInput] = useState('');
    const [list,setList] = useState(()=>{
        const localValue = localStorage.getItem('ITEMS')
        if (localValue=== null) return []
        return JSON.parse(localValue)
    })

    useEffect(()=>{
        localStorage.setItem('ITEMS',JSON.stringify(list))
    },[list])

    function updateInput(event){
        setInput(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault()
        if (input === '') return
        // const id = list.length + 1;
        setList(curentToDo => {
            return[
                ...curentToDo,{title: input,completed : false,id:crypto.randomUUID()}
            ]
        })
        setInput('')   
    }
    function deleteTodo(id){
        setList(curentToDo =>{
            return curentToDo.filter(lists =>lists.id !== id)
        })
    }
    function editTodo(id){

    }
    return(
        
        <div className='container'>
            
                <form onSubmit={handleSubmit} className='form-container'>
                        <h4>todo app</h4>
                        <input onChange={updateInput}  value={input} type='text' id='lists' className='input'/>
                        <button type='submit' className='submit-btn'>add</button>
                    
                    </form>
                    <div className='mini-container'>
                        {list.length ===0 && 'no todos'}
                        {list.map(lists =>{
                            return(
                                <div key={lists.id} className='box'>
                                    
                                    {lists.title}
                                    <div className='btn-contain'>
                                        <button onClick={()=>deleteTodo(lists.id)} className='btn-two'>delete</button>
                                        <button onClick={()=>editTodo} className='btn-two'>edit</button>
                                    </div>
                                </div>
                                

                            )
                        })}
                    </div>

                
                
        </div>
    )
}