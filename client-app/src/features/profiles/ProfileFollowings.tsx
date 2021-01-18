import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Tab, Grid, Header, Card } from 'semantic-ui-react';
import { IProfile } from '../../app/models/Profile';
import { RootStoreContext } from '../../app/stores/rootStore';
import ProfileCard from './ProfileCard';

const ProfileFollowings = () => {
  const rootStore = useContext(RootStoreContext);
  const { profile, followings, loading, activeTab } = rootStore.profileStore;

  //This useEffect has been replaced by the reaction in the ProfileStore

  // useEffect(() => {
  //     loadFollowings("following")
  // }, [loadFollowings])

  return (
    <Tab.Pane loading={loading}>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={
              activeTab === 3
                ? `People following ${profile!.username}`
                : `People ${profile!.username} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={5}>
              {followings.map((profile: IProfile)=>{
                  return <ProfileCard  key={profile.username} profile={profile} />
              })}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfileFollowings);
