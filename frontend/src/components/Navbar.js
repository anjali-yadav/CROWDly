import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NavMenu from './NavMenu'
import auth from './pages/auth/auth-helper'
import CreateIcon from '@material-ui/icons/Create';
import TwitterIcon from '@material-ui/icons/Twitter';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(12),
    backgroundColor: theme.palette.primary.light,
    // boxShadow: ",
  },
  link: {
    textDecoration: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2), 
    color: "black",
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    color: theme.palette.openTitle,
  },
}));

function ButtonAppBar({match,location,history}) {
  const classes = useStyles();
  const jwt = auth.isAuthenticated();
  // const jwt = auth.isAuthenticated();

  return (
    <div className={classes.root}>
      <AppBar className={classes.root} position="fixed">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
          <Link to="/" className={`${classes.logo} ${classes.link}`}><span style={{color: '#6C63FF'}}><b>CROWDly</b><TwitterIcon /></span></Link>
          </Typography>
          {!jwt && <Link to="/signin" className={classes.link}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AccountCircleIcon style={{fontSize: '30px'}}/>
          </IconButton>
          </Link>}
          {jwt &&
            <>
            <Link to="/create" style={{textDecoration:'none'}}>
              <Button variant="outlined" style={{color: '#6C63FF'}} startIcon={<CreateIcon />}>CREATE</Button>
            </Link>
            &nbsp;&nbsp;
            <Link to={'/users'} style={{textDecoration:'none'}}>
            <Button variant="outlined" style={{color: '#6C63FF'}}>USERS</Button>
            </Link>
            <NavMenu props={history}/>
            </>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default withRouter(ButtonAppBar)