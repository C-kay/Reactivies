import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityListItemAttendees from './ActivityListItemAttendees';

const ActivitiyListItem : React.FC<{activity:IActivity}>= ({activity}) => {
  const host = activity.attendees.filter(x => x.isHost)[0];
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={host.image || "/assets/user.png"} />
              <Item.Content>
                <Item.Header as={Link} to={`/activites/${activity.id}`}>{activity.title}</Item.Header>
                <Item.Description>Hosted by {host.username}</Item.Description>
                {activity.isHosting &&
                <Item.Description>
                  <Label
                    basic
                    color="orange"
                    content="You are hosting this activity"
                  />
                </Item.Description>}
                {activity.isGoing &&
                <Item.Description>
                  <Label
                    basic
                    color="green"
                    content="You are going to this activity"
                  />
                </Item.Description>}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Icon name="clock" />
          {format(activity.date, "h:mm a")}
          <Icon name="marker" />
          {activity.venue}, {activity.city}
        </Segment>
        <Segment>
          <ActivityListItemAttendees attendees={activity.attendees} />
        </Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="View"
            color="blue"
          />
          {/* <Button
              name={activity.id}
              loading={target === activity.id && submitting}
              onClick={(e) => deleteActivity(e, activity)}
              floated="right"
              content="Remove"
              color="red"
            /> */}
        </Segment>
      </Segment.Group>
    );
}

export default ActivitiyListItem