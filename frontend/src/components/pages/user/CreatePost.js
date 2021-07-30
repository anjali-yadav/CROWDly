import React, {useState, useEffect} from 'react'
import {listNewsFeed} from '../post/api-post'
import NewPost from '../post/NewPost'
import auth from '../auth/auth-helper'

// const useStyles = makeStyles(theme => ({
//   card: {
//     margin: 'auto',
//     paddingTop: 0,
//     // paddingBottom: theme.spacing(3),
//     minHeight: '100vh'
//   },
//   title: {
//     padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
//     color: theme.palette.openTitle,
//     fontSize: '1em'
//   },
//   media: {
//     minHeight: 330
//   }
// }))
export default function CreatePost () {
  // const classes = useStyles()
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
        return <h1>loading..</h1>
      } else {
        setPosts(data)
      }
    })
    return () => {
      setPosts([]);
      abortController.abort();
    }

  }, [jwt.token, jwt.user._id])

  const addPost = (post) => {
    const updatedPosts = [...posts]
    updatedPosts.unshift(post)
    setPosts(updatedPosts)
  }
    if(posts)
    return (
        <NewPost addUpdate={addPost}/>
    )
    else
    return <h1>loading..</h1>
}