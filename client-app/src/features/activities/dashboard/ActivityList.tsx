import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react';
import { Item, Label} from 'semantic-ui-react';
import { RootStoreContext } from '../../../app/stores/rootStore';
import ActivityListItem from './ActivitiyListItem'


const ActivityList : React.FC= () => {
    const rootStore = useContext(RootStoreContext);
    const {activitiesByDate} = rootStore.activityStore;

    
    return (
      <Fragment>
        {activitiesByDate.map(([group, activities]) => (
          <Fragment>
            <Label key={group} size="large" color="blue">
              {group}
            </Label>

            <Item.Group divided>
              {activities.map((activity) => {
                return <ActivityListItem activity={activity} />;
              })}
            </Item.Group>
          </Fragment>
        ))}
      </Fragment>
    );

  
};

export default observer(ActivityList);
