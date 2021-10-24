import {useState} from 'react';
import './Form.css';
import axios from 'axios';

//Import config
import Config from '../config';

const Form = ({notes}) => {

    const [date, setDate] = useState('');
    const [diet, setDiet] = useState('');
    const [mood, setMood] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [exercise, setExercise] = useState('');

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
         if (name === 'date') {
             setDate(value);
         } else if (name === 'diet') {
             setDiet(value);
         } else if (name === 'mood') {
             setMood(value);
         } else if (name === 'symptoms') {
             setSymptoms(value);
         } else if (name === 'exercise') {
             setExercise(value);
         }
    }

    const handleSubmit = (e) => {
        //Prevent Default Form Behavior
        e.preventDefault();

    
        //Create object with form values
        const note = {
            diet,
            mood,
            symptoms,
            exercise
        }
        
        //Post Note using API
        axios.post(`${Config.apiPostURL}`, note)
       

        //Clear state for all form fields
        setDate('');
        setDiet('');
        setMood('');
        setSymptoms('');
        setExercise('');
        
        
    }

    return (
        <div className="form">
            <h2>Add Note</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-div">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={date} onChange={handleChange} required/>
                </div>
                <div className="mb-3 form-div">
                    <label htmlFor="diet" className="form-label">Diet</label>
                    <textarea className="form-control" id="diet" name="diet" rows="3" onChange={handleChange} value={diet} required></textarea>
                </div>
                <div className="mb-3 form-div">
                    <label htmlFor="mood" className="form-label">Mood</label>
                    <textarea className="form-control" id="mood" name="mood" rows="3" onChange={handleChange} value={mood} required></textarea>
                </div>
                <div className="mb-3 form-div">
                    <label htmlFor="symptoms" className="form-label">Symptoms</label>
                    <textarea className="form-control" id="symptoms" name="symptoms" rows="3" onChange={handleChange} value={symptoms}></textarea>
                </div>
                <div className="mb-3 form-div">
                    <label htmlFor="exercise" className="form-label">Exercise</label>
                    <textarea className="form-control" id="exercise" name="exercise" rows="3" onChange={handleChange} value={exercise}></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-75">Submit</button>
            </form>
        </div>
    )
}

export default Form;
