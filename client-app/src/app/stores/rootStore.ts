import { makeObservable, observable } from "mobx";
import { createContext } from "react";
import ActivityStore from "./activityStore";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";
import ProfileStore from "./ProfileStore";
import UserStore from "./userStore";

export class RootStore{


    @observable activityStore: ActivityStore;
    @observable userStore: UserStore;
    @observable commonStore: CommonStore;
    @observable modalStore: ModalStore;
    @observable profileStore: ProfileStore;

    constructor() {
        this.activityStore = new ActivityStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        makeObservable(this);
        
    }
}

export const RootStoreContext = createContext(new RootStore());