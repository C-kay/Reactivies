import { action, computed, makeObservable, observable, reaction } from "mobx";
import { RootStore } from "./rootStore";
import { IPhoto, IProfile, IUserActivity } from "../models/Profile";
import agent from "../api/agent";
import { toast } from "react-toastify";

export default class ProfileStore{
    rootStore: RootStore;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        makeObservable(this);

        reaction(
            () => this.activeTab,
            (activeTab) => {
                if(activeTab === 3 || activeTab === 4){
                    const predicate = activeTab === 3 ? 'followers' : 'following';
                    this.loadFollowings(predicate);
                }else{
                    this.followings = [];
                }
            }
        )
    }

    @observable profile: IProfile | null = null;
    @observable loadingProfile = true;
    @observable uploadingPhoto = false;
    @observable loading = false;
    @observable followings: IProfile[] = [];
    @observable activeTab: number = 0;
    @observable userActivities: IUserActivity[] = [];
    @observable loadingActivities : boolean = false;

    @computed get isCurrentUser(){
        if(this.rootStore.userStore.user && this.profile){
            return this.rootStore.userStore.user.username === this.profile.username
        }else{
            return false;
        }
    }

    @action loadUserActivities = async (username: string, predicate?: string) =>{
        this.loadingActivities = true;
        try{
            const activities = await agent.Profiles.listActivities(username, predicate!);
            this.userActivities = activities;
            this.loadingActivities = false;

        }catch(error){
            toast.error("Problem Loading activities");
            this.loadingActivities = false
        }
    }


    @action setActiveTab = (activeIndex: number) =>{
        this.activeTab = activeIndex;
    }

    @action loadProfile = async (username: string) =>{
        this.loadingProfile =true;
        try{
            const profile = await agent.Profiles.get(username);
            this.profile = profile;
            this.loadingProfile =false;
        }catch(error){
            this.loadingProfile =false;
            console.log(error);
        }
    }

    @action uploadPhoto = async (file:Blob) => {
        this.uploadingPhoto = true;

        try{
            const photo = await agent.Profiles.uploadPhoto(file);
            if(this.profile){
                this.profile.photos.push(photo);
                if(photo.isMain && this.rootStore.userStore.user){
                    this.rootStore.userStore.user.image = photo.url
                    this.profile.image= photo.url
                }  
            }
            this.uploadingPhoto = false;
        }catch(error){
            this.uploadingPhoto = false;
            console.log(error);
            toast.error('Problem uploading photo');
        }
    }

    @action setMainPhoto = async (photo: IPhoto) =>{
        this.loading =true;

        try{
            await agent.Profiles.setMainPhoto(photo.id);
            this.rootStore.userStore.user!.image = photo.url;
            this.profile!.photos.find(a => a.isMain)!.isMain = false;
            this.profile!.photos.find(a => a.id === photo.id)!.isMain = true;
            this.profile!.image= photo.url;
            this.loading = false;
        }catch(error){
            toast.error('Problem setting photo as main');
            this.loading = false;
        }
    }

    @action deletePhoto = async (photo: IPhoto)=>{
        this.loading = true;
        try{
            await agent.Profiles.deletePhoto(photo.id);
            this.profile!.photos = this.profile!.photos.filter(a => a.id !== photo.id);
            this.loading = false;
        }catch(error){
            toast.error('Problem deleting the photo')
            this.loading = false;
        }
    }

    @action follow = async (username: string)=>{
        this.loading = true;
        try{
            await agent.Profiles.follow(username);
            this.profile!.following =true;
            this.profile!.followersCount++;
            this.loading = false;
        }catch(error){
            this.loading = false;
            toast.error("Problem following user");
        }
    }

    @action unfollow = async (username: string)=>{
        this.loading = true;
        try{
            await agent.Profiles.unfollow(username);
            this.profile!.following =false;
            this.profile!.followersCount--;
            this.loading = false;
        }catch(error){
            this.loading = false;
            toast.error("Problem unfollowing user");
        }
    }
    
    @action loadFollowings = async (predicate: string) =>{
        this.loading= true;
        try{
            const profiles = await agent.Profiles.listFollowings(this.profile!.username, predicate);
            this.followings = profiles;
            this.loading= false;
        }catch(error){
            this.loading= false;
            toast.error("Problem loading following");
        }
    }
}