import React, { Fragment, SyntheticEvent, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import { NavBar } from '../../features/nav/NavBar';
import { ActivityDashboard } from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../api/agent';
import { LoadingComponent } from './LoadingComponent';
//import { render } from '@testing-library/react';



const App = () =>{
  
  const [activities, setActivities]= useState<IActivity[]>([]);
  const [SelectedActivity, setSelectedActivity]= useState<IActivity | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState(' ');

  const handleSelectActivity= (id:string)=>{
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };

  const handleCreateForm= ()=>{
    setSelectedActivity(null);
    setEditMode(true);
  };

  const handleCreateActivity = (activity: IActivity) => {
    setSubmitting(true);
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=> setSubmitting(false));
  };

  const handleEditActivity = (activity: IActivity) =>{
    setSubmitting(true);
    agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(a => a.id !== activity.id), activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    }).then(()=> setSubmitting(false));
  };

  const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,activity: IActivity) =>{
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(activity.id).then(()=>{
      setActivities([...activities.filter(a => a.id !== activity.id)]);
      // setSelectedActivity(activity);
      // setEditMode(false);
    }).then(()=> setSubmitting(false));;
  };
  
  useEffect(()=>{
    agent.Activities.list()
    .then((response) =>{
      let activities: IActivity[] =[];
      response.forEach((activity)=> {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);
      
    }).then(()=> setLoading(false));
  }, []);
  
  if(loading) return <LoadingComponent content="Looading activities..."/>;

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
        submitting={submitting}
        target ={target}
        
        />
      </Container>

    </Fragment>
  );
}

export default App;