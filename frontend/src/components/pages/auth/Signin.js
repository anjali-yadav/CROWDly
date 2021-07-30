import React, {useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {signin} from './api-auth.js'
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import auth from '../auth/auth-helper'
import loginimg from '../../../login.svg'
import AuthImg from './AuthImg'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth :"70vw",
    height: "95vh", 
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: '0 auto'
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  image: {
    backgroundImage: {loginimg},
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.light,
    padding: theme.spacing(5),
    border: "1px solid black",
    maxHeight: "90%"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    height: '50%',
    margin: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.dark,
    color: "white",
    "&:hover": {
        backgroundColor: theme.palette.primary.light,
        color: "black",
        border: "2px solid black",
    }
  },
  error: {
    verticalAlign: 'middle'
  }
}));

export default function Signin(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
    password: '',
    redirectToReferrer: false,
    error: ''
  })
  const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
      }
    
      const clickSubmit = (e) => {
        e.preventDefault();
        const user = {
          email: values.email || undefined,
          password: values.password || undefined,
        }
        signin(user).then((data) => {
          // console.log(data);
          if (!data.success) {
            setValues({ ...values, error: data.error,redirectToReferrer: false})
          } else {
            auth.authenticate(data, () => {
              setValues({ ...values, error: '',redirectToReferrer: true})
            })
          }
          }).catch((err) => {
            console.log(err);
          })
      }
      const {from} = props.location.state || {
        from: {
          pathname: '/'
        }
    }

    const {redirectToReferrer} = values;
    useEffect(() =>{
      window.scrollTo(0, 0);
    },[])
    
  return (
    <>
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item elevations={6} className={classes.paper} xs={12} sm={8} md={5}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="email"
                label="Email"
                type="name"
                id="email"
                autoComplete="current-email"
                onChange={handleChange('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange('password')}
              />
            </Grid>
            <br/> {
              values.error && (
                <Grid item xs={12}>
                  <Typography component="p" color="error">
                  <Icon color="error" className={classes.error}>error</Icon>
                  &nbsp;
                  {values.error}
                  </Typography>
                  </Grid>
                )
            }
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={clickSubmit}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signup" style={{textDecoration:'none'}}>
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
      
      <AuthImg />
      {<Dialog open={redirectToReferrer} onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
            return true;
        }
    }}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Successfully Signed In!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Link to={from} className={classes.link}>
          <Button size="medium" variant="contained" style={{backgroundColor: '#6C63FF', color: 'white'}}>Continue</Button>
        </Link>
        </DialogActions>
      </Dialog>}
    </Grid>
    </>
  );
}