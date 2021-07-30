import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import FollowGrid from './FollowGrid'
import PostList from '../post/PostList';

export default function ProfileTabs(props) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab label="POSTS" />
        <Tab label="FOLLOWERS" />
        <Tab label="FOLLOWING" />
      </Tabs>
     
      {value === 0 && <TabContainer><PostList removeUpdate={props.removePostUpdate} posts={props.posts}></PostList></TabContainer>}
      {value === 1 && <TabContainer><FollowGrid people={props.user.followers}/></TabContainer>}
      {value === 2 && <TabContainer><FollowGrid people={props.user.following}/></TabContainer>}
    </Paper>
  );
}

ProfileTabs.propTypes = {
    user: PropTypes.object.isRequired,
    removePostUpdate: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
}

const TabContainer = (props) => {
    return (
      <Typography component="div" style={{ padding: 8 * 2 }}>
        {props.children}
      </Typography>
    )
}
  
TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}