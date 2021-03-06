import { action, computed, makeObservable, observable } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from '../api/agent';
import { RootStore } from "./rootStore";
import {history} from  "../../index";

export default class UserStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @observable user: IUser | null = null;
  @observable loading = false

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);
      this.user = user;
      console.log(this.user);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  }

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      history.push("/activities");
    } catch (error) {
      throw error;
    }
  }

  @action getUser= async ()=>{
    try{
      const user = await agent.User.current();
      this.user = user;
    }catch(error){
      console.log(error);
    }
  }

  @action logout = () => {
    this.rootStore.commonStore.setToken(null);
    console.log(this.user);
    this.user = null;
    history.push('/');
  }

  @action fbLogin =async (response: any) =>{
    try{
      this.loading= true;
      const user = await agent.User.fbLogin(response.accessToken);
      this.user = user;
      this.rootStore.commonStore.setToken(user.token);
      this.rootStore.modalStore.closeModal();
      this.loading= false
      history.push("/activities");
    }catch(error){
      this.loading= false;
      throw error;
    }
  }


}