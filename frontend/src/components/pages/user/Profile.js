import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import DeleteUser from './DeleteUser'
import auth from './../auth/auth-helper'
import {read} from './api-user.js'
import {Redirect, Link} from 'react-router-dom'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FollowButton from './FollowButton';
import ProfileTabs from './ProfileTabs'
import { listByUser } from '../post/api-post'

const useStyles = makeStyles(theme => ({
  root: ({
    maxWidth: 600,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    background: "secondary",
    border: '4px solid #6C63FF'
  }),
  title: {
    marginTop: theme.spacing(1),
    margin:'0 auto',
    align: "center",
    color: '#212121'
  }
}))
function ListItemLink(props) {
  return <ListItem component="a" {...props} />;
}
export default function Profile({ match , history}) {
  const classes = useStyles()
  const [values,setValues] = useState({
    user: {following:[], followers:[]},
    redirectToSignin: false,
    following: false
  })
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  
  // const [user, setUser] = useState({})
  // const [redirectToSignin, setRedirectToSignin] = useState(false)
  // const [redirectToUpdate, setRedirectToUpdate] = useState(false)
  
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    // setLoading(true)
    read({
      userId: match.params.userId
    }, {t: jwt.token}, signal).then((data) => {
      if (data && data.error) {
        setValues({...values, redirectToSignin: true})
      } else if(data) {
        let following = checkFollow(data)
        setValues({...values, user: data, following: following})
        // setFollowingCount(values.user.following.length)
        // setFollowerCount(values.user.followers.length)
        // setLoading(false)
      }
    })
    loadPosts(match.params.userId)
    
    return () => {
      setLoading(false)
      abortController.abort();
    }

  }, [match.params.userId, jwt.token])

  const checkFollow =(user)=>{
    const match = user.followers.some((follower)=>{
      return follower._id===jwt.user._id
    })
    return match;
  }

  const photoUrl = values.user._id
    ? `/api/users/photos/${values.user._id}?${new Date().getTime()}`
    : undefined

  const loadPosts = (user) =>{
    listByUser ({
      userId: user
    }, {
      t: jwt.token
    }) .then((data)=>{
      if(data.error) {
        console.log(data.error)
      } else {
        setPosts(data)
      }
    })
  }  

  const removePost = (post) => {
    const updatedPosts = posts
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    setPosts(updatedPosts)
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const clickFollow = (callApi)=>{
    // if(following)
    callApi({
      userId: jwt.user._id
    },{
      t: jwt.token
    },values.user._id).then((data) => {
      if(data.error) {
        console.log(data.error);
        setValues({...values, error: data.error});
      }else {
        setValues({...values, user: data, following: !values.following});
      }
    })
    // else {
    //   unfollow({
    //     userId: jwt.user._id
    //   },{
    //     t: jwt.token
    //   },values.user._id).then((data) => {
    //     if(data.error) {
    //       console.log(data.error);
    //       setValues({...values, error: data.error});
    //     }else {
    //       setValues({...values, user: data, following: !values.following});
    //     }
    //   })
    // }
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  if (values.redirectToSignin) {
    return <Redirect to='/signin'/>
  }
    
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  };
    return (
      <>
      {<Paper className={classes.root} elevation={4} style={{background: "white"}}>
        <ListItem style={{display:'flex', justifyContent:'flex-end'}}>
          <IconButton aria-label="display more actions" onClick={handleMenuClick}>
            <MoreVertIcon style={{color: 'black'}}/>
          </IconButton>
        </ListItem>
        {
          auth.isAuthenticated().user && auth.isAuthenticated().user._id === values.user._id ?
          (
            <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
          <MenuItem onClick={handleMenuClose}><Link to={"/users/edit/" + values.user._id} style={{textDecoration:'none', color: '#6C63FF'}}><Button style={{color:'#6C63FF'}}>UPDATE</Button></Link></MenuItem>
          <MenuItem onClick={handleMenuClose}><DeleteUser userId={values.user._id} /></MenuItem>
          </Menu>
        ):
        (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
          <MenuItem onClick={handleMenuClose}>
          <FollowButton following={values.following} onButtonClick={clickFollow}></FollowButton>
          </MenuItem>
          </Menu>
        )
        }
        <List  margin='0 auto'>
        <List style={{display: 'flex', flexDirection: 'column',justifyContent:'flex-start'}}>
          <List style={{display:'flex', justifyContent:'center', marginBottom:'1rem'}}>
            <ListItemAvatar>
            {/* <Avatar src={`/api/users/photos/${values.user._id}`}></Avatar> */}
              {photoUrl?
              (<Avatar style={{ height: '14rem', width: '14rem' }} src={photoUrl}>
              </Avatar>):
              (<Avatar style={{ height: '10rem', width: '10rem' }}>
                <Person style={{ height: '8rem', width: '8rem' }}/>
              </Avatar>)
              }
            </ListItemAvatar>
          </List>
          <ListItem style={{display:'flex', justifyContent:'center'}}>
            {values.user.github && <ListItemIcon>
            <ListItemLink href={values.user.github}>
              <><GitHubIcon style={{padding:0, color: "black"}}/></>
            </ListItemLink>
          </ListItemIcon>}
          &nbsp;
          {values.user.linkedin && <ListItemIcon >
            <ListItemLink href={values.user.linkedin}>
              <LinkedInIcon style={{padding:0, color: "#0077b5",fontSize: '30px'}}/>
            </ListItemLink>
          </ListItemIcon>}
          </ListItem>
          </List>
          <ListItem style={{display: 'flex', flexDirection: 'column',justifyContent:'center', margin: '0 auto'}}>
          <ListItemText primary={values.user.name} secondary={values.user.email} style={{textAlign:'center',fontSize:'0.7em',margin: '0 auto'}}/> 
          <ListItemText primary={values.user.about} style={{align:'center'}} align="center">{values.user.about}</ListItemText>
          <ListItemText primary={`I am a Student`}></ListItemText>
          <List style={flexContainer}>
            <ListItemText primary="Followers" secondary={values.user.followers.length} style={{textAlign:'center'}}></ListItemText>
            &nbsp;
            <Divider orientation="vertical" flexItem />
            &nbsp;
            <ListItemText primary="Following" secondary={values.user.following.length} style={{textAlign:'center'}}></ListItemText>
          </List>
          </ListItem>
        </List>
        <Divider/>
        <ListItemText secondary={"Joined: " + (
              new Date(values.user.created)).toDateString()}/>
        <Divider />
        <ProfileTabs user={values.user} posts={posts} removePostUpdate={removePost}/>
      </Paper>}
      </>
    )
}