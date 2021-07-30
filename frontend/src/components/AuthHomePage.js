import {Grid } from '@material-ui/core';
import React from 'react'
import FindPeople from './pages/user/FindPeople';
import Newsfeed from './pages/post/Newsfeed';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      margin: 30,
    },
    card: {
      maxWidth: 600,
      margin: 'auto',
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    title: {
      padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
      color: theme.palette.text.secondary
    },
    media: {
      minHeight: 400
    },
    credit: {
      padding: 10,
      textAlign: 'right',
      backgroundColor: '#ededed',
      borderBottom: '1px solid #d0d0d0',
      '& a':{
        color: '#3f4771'
      } 
    }
}))
  
function AuthHomePage({history}) {
    const classes = useStyles()
    
    return (
        <div className={classes.root}>
            <Grid container spacing={8}>
            <Grid item xs={8} sm={7}>
              <Newsfeed/>
            </Grid>
            <Grid item xs={6} sm={5}>
              <FindPeople/>
            </Grid>
          </Grid>
      </div>
    )
}

export default AuthHomePage
