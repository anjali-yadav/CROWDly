import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link, withRouter } from 'react-router-dom';
import { Box } from '@material-ui/core';
import auth from './pages/auth/auth-helper'

function NavMenu({match,location,history}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const jwt = auth.isAuthenticated();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClose = () =>{
    setAnchorEl(null);
    auth.clearJWT(()=>{
      history.push('/')
    })
  }
  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <AccountCircleIcon style={{fontSize: "30px"}}/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{color: 'red'}}
      >
        <Box style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <Link onClick={handleClose} to={"/users/"+ jwt.user._id} style={{textDecoration: "none"}}>
                <Button style={{color:'#6C63FF', backgroundColor: "white"}}>
                    PROFILE
                </Button>
            </Link>
            <Link onClick={handleLogoutClose} to={"/"} style={{textDecoration: "none"}}>
                <Button style={{color:'#6C63FF', backgroundColor: "white"}}>
                    LOGOUT
                </Button>
            </Link>
        </Box>
        
      </Menu>
    </div>
  );
}
export default withRouter(NavMenu)