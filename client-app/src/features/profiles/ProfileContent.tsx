import { observer } from 'mobx-react-lite';
import React from 'react';
import {Tab} from 'semantic-ui-react';
import ProfileActivities from './ProfileActivities';
import ProfileFollowings from './ProfileFollowings';
import ProfilePhotos from './ProfilePhotos';

interface IProps{
  setActiveTab: (activeIndex: any) => void;
}

const panes = [
  { menuItem: "About", render: () => <Tab.Pane>About content</Tab.Pane> },
  { menuItem: "Photos", render: () => <ProfilePhotos /> },
  {
    menuItem: "Activities",
    render: () => <ProfileActivities/>,
  },
  { menuItem: "Followers", render: () => <ProfileFollowings /> },
  { menuItem: "Following", render: () => <ProfileFollowings /> },
];

const ProfileContent : React.FC<IProps>= ({setActiveTab}) => {
    return (
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
        //activeIndex={1}
        onTabChange= {(e, data) => setActiveTab(data.activeIndex) }
      />
    );
}

export default observer(ProfileContent)
