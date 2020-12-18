import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
//import { render } from '@testing-library/react';



const App = () =>{
  
  const [activities, setActivities]= useState<IActivity[]>([]);
  const [SelectedActivity, setSelectedActivity]= useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity= (id:string)=>{
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleCreateForm= ()=>{
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) =>{
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
  };

  const handleEditActivity = (activity: IActivity) =>{
    setActivities([...activities.filter(a => a.id !== activity.id), activity]);
    setSelectedActivity(activity);
    setEditMode(false);
  };

  const handleDeleteActivity = (activity: IActivity) =>{
    setActivities([...activities.filter(a => a.id !== activity.id)]);
    setSelectedActivity(activity);
    setEditMode(false);
  };
  
  useEffect(()=>{

    axios.get<IActivity[]>('http://localhost:5000/api/activities')
    .then((response) =>{
      let activities: IActivity[] =[];
      response.data.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);
      
    });
  }, []);
  

  return  (
    <Fragment>
      <NavBar openCreateForm={handleCreateForm}/>

      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
        activities={activities} 
        selectActivity={handleSelectActivity} 
        selectedActivity={SelectedActivity}
        editMode={editMode}
        setEditMode={setEditMode}
        createActivity ={handleCreateActivity}
        editActivity ={handleEditActivity}
        deleteActivity={handleDeleteActivity}
        
        />
      </Container>

    </Fragment>
  );
}

export default App;
