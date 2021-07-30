import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import PostList from './PostList'
import {listNewsFeed} from './api-post.js'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    // color: theme.palette.openTitle,
    fontSize: '2em'
  },
  media: {
    minHeight: 330
  }
}))
export default function Newsfeed () {
  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listNewsFeed({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data && data.error) {
        console.log(data.error)
      } else {
        setPosts(data)
      }
    })
    return () => {
      setPosts([]);
      abortController.abort();
    }
    
  },[jwt.token, jwt.user._id])

  const removePost = (post) => {
    const updatedPosts = [...posts]
    const index = updatedPosts.indexOf(post)
    updatedPosts.splice(index, 1)
    setPosts(updatedPosts)
  }
    if(posts)
    return (
      <Card className={classes.card}>
        <h1 style={{display: 'flex', justifyContent: 'center'}}>NEWSFEED</h1>
        <Divider/>
        <Divider/>
        <PostList removeUpdate={removePost} posts={posts}/>
      </Card>
    )
    else
    return <h1>loading..</h1>
}