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
import {create} from './api-auth.js'
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import AuthImg from './AuthImg.js';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth :"70vw",
    maxHeight: "120vh", 
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    margin: '0 auto'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
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
    border: "1px solid black"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    height: '100%',
    marginTop: theme.spacing(1),
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

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: '',
    password: '',
    password2: '',
    email: '',
    open: false,
    error: ''
  })
  const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
      }
    
      const clickSubmit = (e) => {
        e.preventDefault();
        const user = {
          name: values.name || '',
          email: values.email || '',
          password: values.password || '',
          password2: values.password2 || ''
        }
        create(user).then((data) => {
          if (data.errors) {
            setValues({ ...values, error: data.errors})
          } else {
            setValues({ ...values, error: undefined, open: true})
          }
          }).catch((err) => {
        })
      }
      useEffect(()=>{
        window.scrollTo(0, 0)
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Username"
                type="name "
                id="name"
                autoComplete="current-name"
                onChange={handleChange('name')}
              />
            </Grid>
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
                id="password1"
                autoComplete="current-password"
                onChange={handleChange('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                autoComplete="current-password2"
                onChange={handleChange('password2')}
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/signin" style={{textDecoration:'none'}}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
      <AuthImg></AuthImg>
      <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/signin" style={{textDecoration: "none", color: "white"}}>
            <Button autoFocus="autoFocus" variant="contained" style={{backgroundColor: '#2979FF', color: '#FFFFFF'}}>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </Grid>
    </>
  );
}