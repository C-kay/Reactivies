import React, { FormEvent, useContext, useEffect, useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import {ActivityFormValues, IActivityFormValues } from '../../../../app/models/activity'
import {v4 as uuid} from "uuid";
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import { TextInput } from '../form/TextInput';
import { TextAreaInput } from '../form/TextAreaInput';
import { SelectInput } from './SelectInput';
import { category } from './options/categoryOptions';
import DateInput from './DateInput';
import { combineDateAndTime } from '../../../../app/util/util';
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';
import { RootStoreContext } from '../../../../app/stores/rootStore';


const validate = combineValidators({
  title: isRequired({message: 'The event title is required'}),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({message: 'Descrioption needs to be aat least 5 characters'}),
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});

interface DetailParams{
  id: string;
}

const ActivityForm : React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {

 
  const rootStore = useContext(RootStoreContext);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity,
    clearActivity,
  } = rootStore.activityStore;
    
  
    const [activity, setActivity]= useState<IActivityFormValues>(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      setLoading(true);
      if(match.params.id) loadActivity(match.params.id).then((activity)=>{
         setActivity(new ActivityFormValues(activity));
      }).finally(()=> setLoading(false));
      return ()=>{
        clearActivity();
      }
    },[loadActivity,clearActivity,match.params.id])

    // const handleSubmit = ()=>{
    //     if(activity.id.length === 0){
    //       let newActivity={
    //         ...activity,
    //         id: uuid()
    //       }
    //       createActivity(newActivity);
    //     }else{
    //       editActivity(activity).then(()=>{ history.push(`/activities/${activity.id}`)});
    //     }
    // }

    const handleFinalFormSubmit = (values: any)=>{

      const dateAndTime = combineDateAndTime(values.date, values.time);
      const {date, time, ...activity} = values;
      activity.date = dateAndTime;

      if (!activity.id) {
        let newActivity = {
          ...activity,
          id: uuid(),
        };
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
    }

    const handleInputChange= (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name, value} = event.currentTarget;
        setActivity({...activity, [name]: value});
    }

    
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm
              validate={validate}
              loading={loading}
              initialValues={activity}
              onSubmit={handleFinalFormSubmit}
              render={({ handleSubmit, invalid, pristine }) => (
                <Form onSubmit={handleSubmit}>
                  <Field
                    onChange={handleInputChange}
                    name="title"
                    placeholder="Title"
                    value={activity.title}
                    component={TextInput}
                  />
                  <Field
                    component={TextAreaInput}
                    row={3}
                    name="description"
                    placeholder="Description"
                    value={activity.description}
                  />
                  <Field
                    component={SelectInput}
                    options={category}
                    name="category"
                    placeholder="Category"
                    value={activity.category}
                  />

                  <Form.Group widths={"equal"}>
                    <Field
                      component={DateInput}
                      name="date"
                      placeholder="Date"
                      value={activity.date}
                    />
                    <Field
                      component={DateInput}
                      name="date"
                      placeholder="Date"
                      value={activity.date}
                    />
                  </Form.Group>

                  <Field
                    component={TextInput}
                    name="city"
                    placeholder="City"
                    value={activity.city}
                  />
                  <Field
                    component={TextInput}
                    name="venue"
                    placeholder="Venue"
                    value={activity.venue}
                  />
                  <Button
                    disabled={loading || invalid || pristine}
                    loading={submitting}
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                  />
                  <Button
                    disabled={loading}
                    onClick={
                      activity.id
                        ? () => history.push(`/activities/${activity.id}`)
                        : () => history.push("/activities")
                    }
                    floated="right"
                    positive
                    type="submit"
                    content="Cancel"
                  />
                </Form>
              )}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    );
};

export default observer(ActivityForm);
