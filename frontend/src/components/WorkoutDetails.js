import useWorkoutContext from "../hooks/useWrokoutContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Description: </strong> {workout.load}
      </p>
      <p>
        <strong>Priority Level: </strong> {workout.reps}
      </p>
      <p > 
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleClick} >
        <i className="bx bxs-trash-alt"></i>
      </span>
    </div>
  );
};

export default WorkoutDetails;
