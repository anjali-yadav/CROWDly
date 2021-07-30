import React from 'react'
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import Box from '@material-ui/core/Box';
import { Grid } from '@material-ui/core';

function Copyright() {
    return (
      <Typography variant="body2" align="center" style={{color:'white'}}>
        {'Copyright © '}
        <Link color="white" to="/" style={{color:'white'}}>
          Crowd-ly
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
function Footer() {
    return (
        <Box mt={7} >
            <Grid style={{backgroundColor: 'black', paddingTop:'10px', paddingBottom:'10px'}}>
            <Grid item xs={12}>
              <Copyright />
            </Grid>
            </Grid>
        </Box>
    )
}

export default Footer
