import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import welcome from '../welcome.svg'
import share_ideas from '../share_ideas.svg'
import safe from '../safe.svg'
import { Button} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom'
import auth from './pages/auth/auth-helper'
import AuthHomePage from './AuthHomePage';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: '160vh'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    marginTop: theme.spacing(2),
    marginBottom: '5rem',
    boxShadow: 'none'
  },
}));

export default function Landing({history}) {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  if(jwt)
  return(
    <AuthHomePage props={history}/>
  )
  return (
    <div className={classes.root}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item xs={12} md={8} mt={5}>
          <Paper className={classes.paper} style={{position: 'relative', height: '60vh'}}>
            <img src={welcome} style={{position: 'absolute', left: '0', top: '0', width: "100%", height: '100%'}} alt="welcome"></img>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper} style={{position: 'relative', boxShadow: 'none'}}>
          <h1>Got a new Story?!</h1>
          <h1>Tell your story to the world with <span style={{color: '#6C63FF'}}>CROWDly</span></h1>
          <Link to="/signin" style={{textDecoration: 'none'}}>
            <Button size="large" variant="contained" style={{backgroundColor: '#6C63FF', color: '#FFFFFF'}}>GET STARTED</Button>
          </Link>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
          <h1>Login or Register and
          start sharing your thoughts and ideas
          with others...</h1>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper} style={{position: 'relative', height: '60vh'}}>
            <img src={share_ideas} style={{position: 'absolute', left: '0', top: '0', width: "100%", height: '100%'}} alt="Share_Ideas"></img>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper className={classes.paper} style={{position: 'relative', height: '60vh'}}>
          <img src={safe} style={{position: 'absolute', left: '0', top: '0', width: "100%", height: '100%'}} alt="safe"></img>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
          <h1>Safe and Secure with User Login and Authentication System</h1>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper className={classes.paper} style={{marginBottom:'1rem'}}>
            <Button size="large" style={{backgroundColor:'black', color:'white'}}>
              <GitHubIcon />
              &nbsp;
              &nbsp;
              <Link to={{ pathname: "https://github.com/anjali-yadav/CROWDly" }} target="_blank" style={{textDecoration:'none', color:'white'}}>OPEN SOURCED ON GITHUB</Link>
            </Button>
          </Paper>
        </Grid>
      </Grid>

    </div>
  );
}
