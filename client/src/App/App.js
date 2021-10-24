import {useState} from 'react';
import { Switch, Route, BrowserRouter} from 'react-router-dom';

//Import Components
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Notes from '../Notes/Notes';
import UpdateNote from '../UpdateNote/UpdateNote';

const App = () => {

  const [showAddTask, setAddTask] = useState(true);

  //Function to toggle show AddTaskForm
  const toggleShowAddTask = () => {
    setAddTask(!showAddTask);
  }

  return (
    <div>
      <Header/>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" render={(props) => (<Notes onClick={toggleShowAddTask} showAddTask={showAddTask}/>)}/>
            <Route exact path="/notes/:id/update" component={UpdateNote}/>
          </Switch>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
