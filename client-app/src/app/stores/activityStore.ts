import {action, observable, computed, makeObservable} from 'mobx';
import { SyntheticEvent } from 'react';
import agent from '../api/agent';
import { IActivity } from '../models/activity';
import {history} from '../../index'
import { toast } from 'react-toastify';
import { RootStore } from './rootStore';
import { createAttendee, setActivityProps } from '../util/util';

export default class ActivityStore {

  rootStore: RootStore;

  constructor(rootStore: RootStore){
    this.rootStore = rootStore;
    makeObservable(this);
  }


  @observable activityRegistry = new Map();
  @observable selectedActivity: IActivity | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target ='';
  @observable loading = false;

  @computed get activitiesByDate() {
    // return Array.from(this.activityRegistry.values()).sort(
    //   (a, b) => a.date.getTime() - b.date.getTime()
    // );
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
  }

  groupActivitiesByDate(activities: IActivity[]){
    const sortedActivities = activities.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    return Object.entries(sortedActivities.reduce((activities, activity) =>{
      const date = activity.date.toISOString().split('T')[0];
      console.log("Testing things",date);
      activities[date] = activities[date] ? [...activities[date], activity] : [activity];
      return activities;
    }, {} as {[key:string]: IActivity[]}));
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;
    
    try {
      const activities = await agent.Activities.list();
      activities.forEach((activity) => {
        setActivityProps(activity, this.rootStore.userStore.user!);

        this.activityRegistry.set(activity.id, activity);
        this.loadingInitial = false;
      });
    } catch (error) {
      this.loadingInitial = false;
      console.log(error);
    }
  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activityRegistry.get(id);
  };

  @action loadActivity= async (id: string)=>{
    let activity = this.getActivity(id);
    if(activity){
      this.selectedActivity = activity;
      return activity;
    }else{
      this.loadingInitial = true;
      try{
        activity = await agent.Activities.details(id);
        setActivityProps(activity, this.rootStore.userStore.user!);
        this.selectedActivity =activity;
        this.activityRegistry.set(activity.id, activity);
        this.loadingInitial = false;
        return activity;
      }catch(error){
        this.loadingInitial = false;
      }
    }
  }

  @action clearActivity= ()=>{
    this.selectedActivity = null;
  }

  getActivity=(id: string)=>{
    return this.activityRegistry.get(id);
  }

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;
    try {
      await agent.Activities.create(activity);
      this.activityRegistry.set(activity.id, activity);
      const attendee = createAttendee(this.rootStore.userStore.user!);
      attendee.isHost = true;
      let attendees =[];
      attendees.push(attendee);
      activity.attendees= attendees;
      activity.isHosting =true;
      this.selectedActivity = activity;
      this.submitting = false;

      history.push(`/activities/${activity.id}`);
    } catch (error) {
      this.submitting = false;
      toast.error('Problem submitting data');
      console.log(error.response);
    }
  };

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;

    try {
      await agent.Activities.update(activity);
      this.activityRegistry.set(activity.id, activity);
      this.selectedActivity = activity;
      this.submitting = false;

      history.push(`/activities/${activity.id}`);
    } catch (error) {
      console.log(error);
      this.submitting = false;
    }
  };

  @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>,activity: IActivity) =>{
    this.submitting =true
    this.target = event.currentTarget.name;
    try{
        await agent.Activities.delete(activity.id);
        this.activityRegistry.delete(activity.id);
        this.submitting = false;
    }catch(error){
        console.log(error);
        this.submitting = false;
        this.target= '';
    }
    
  }

  @action attendActivity = async () =>{
    const attendee = createAttendee(this.rootStore.userStore.user!);
    this.loading = true;
    try{
      await agent.Activities.attend(this.selectedActivity!.id);
      if(this.selectedActivity){
        this.selectedActivity.attendees.push(attendee);
        this.selectedActivity.isGoing = true;
        this.activityRegistry.set(this.selectedActivity.id, this.selectedActivity);
        this.loading = false;
      }
    }catch(error){
      this.loading = false;
      toast.error('Problem signing up to activity');
    }

    
  }

  @action cancelAttendance = async ()=>{
    this.loading = true;
    try{
      await agent.Activities.unattend(this.selectedActivity!.id);
      if(this.selectedActivity){
        this.selectedActivity.attendees = this.selectedActivity.attendees.filter(
          a => a.username !== this.rootStore.userStore.user!.username
        );
        this.selectedActivity.isGoing =false;
        this.activityRegistry.set(this.selectedActivity.id, this.selectedActivity);
        this.loading = false;
      }
    }catch(error){
      toast.error("Problem canceling attendance");
      this.loading = false;
    }
    
    
  }
}

