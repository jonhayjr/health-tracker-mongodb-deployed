import {useState, useEffect} from 'react';

//Import modules
import axios from 'axios';
import Moment from 'moment';

//import CSS
import './Notes.css';

//Import config
import Config from '../config';

//Import Components
import Form from '../Form/Form';
import Button from '../Button/Button';


const Notes = ({onClick, showAddTask}) => {
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //Set isLoading to true 
        setIsLoading(true);
        axios.get(`${Config.apiBaseUrl}`)
        .then(res => {
            setNotes(res.data);
        })

          //Set isLoading to false
          setIsLoading(false)
    }, [notes])

    const handleDelete = (e) => {
        //Prevent default behavior
        e.preventDefault();

        //Get id
        const id = e.target.getAttribute('data-index');

        //Send delete request to api
        axios.delete(`${Config.apiBaseUrl}/${id}`);
    }

    const noteElements = notes ?
    notes.map((note, index) => 
        ( 
            <div className="card" key={note._id}>
                <div className="card-header">
                    <p>{Moment(note.date).format('MMMM Do YYYY')}</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Diet: {note.diet}</li>
                    <li className="list-group-item">Mood: {note.mood}</li>
                    <li className="list-group-item">Symptoms: {note.symptoms}</li>
                    <li className="list-group-item">Exercise: {note.exercise}</li>
                </ul>
                <a className="btn btn-primary w-50 mt-2 text-white" href={`/notes/${note._id}/update`}>Update</a>
                <button data-index={note._id} type="submit" className="btn btn-primary w-50 mt-2 mb-2" onClick={handleDelete}>Delete</button>
            </div>
        )
    )
    : '';
 

    return (
        <div className="mb-5">
            <Button onClick={onClick} showAddTask={showAddTask}/>
            {
                showAddTask && <Form notes={notes}/>
            }
            {
            isLoading 
            ? <p className='text-center lead my-4'>Loading...</p>
            :
            <div className="note-container mt-5">
                {
                noteElements
                }
            </div>
            }
        </div>
    )
}

export default Notes
