import { useState } from "react";
import useWorkoutContext from "../hooks/useWrokoutContext";


const WorkoutForm = () => {

    const {dispatch} =useWorkoutContext()
    const [title, setTitle] = useState('')
    const [reps, setReps] = useState('')    
    const [load, setLoad] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyfields] = useState([])

    const handleSubmit =async(e)=>{
            e.preventDefault()

            const workout = {title,reps,load}

            const response = await fetch('/api/workouts',  {

                method:'POST',
                body:JSON.stringify(workout),
                headers:{
                        'Content-Type':'application/json'

                }
            })
            const json = await response.json()

            if (!response.ok) {
              setError(json.error)
              setEmptyfields(json.emptyFields)

            }
            if (response.ok) {
              setError(null)
              setTitle('')
              setLoad('')
              setReps('')
              setEmptyfields([])
              dispatch({type:'CREATE_WORKOUT', payload:json})
              console.log('new workout added:', json)
            }
    }


    return ( 
        <form className="create" onSubmit={handleSubmit} >

            <h3>Add New Task</h3>
            <label> Title:</label>
            <input 
                type="text" 
                onChange={(e)=> setTitle(e.target.value) }
                value={title}
                className={emptyFields.includes('title') ? 'error': ' '}
                 />

            <label>Description:</label>
                <input 
                    type="text" 
                    onChange={(e) => setLoad(e.target.value)} 
                    value={load}
                    className={emptyFields.includes('load') ? 'error': ' '}
                />

                <label>Priority Level:</label>
                <input 
                    type="text" 
                    onChange={(e) => setReps(e.target.value)} 
                    value={reps} 
                    className={emptyFields.includes('reps') ? 'error': ' '}
                />

                <button>Add Task</button>    
                             

        </form>
     );
}
 
export default WorkoutForm;