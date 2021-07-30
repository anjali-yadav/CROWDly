import React from 'react'
import Grid from '@material-ui/core/Grid';
import loginimg from '../../../login.svg'

function AuthImg() {
    return (
        <Grid item xs={false} sm={4} md={7}>
            <img src={loginimg} width="100%" height="80%" alt="loginimg"></img>
        </Grid>
    )
}

export default AuthImg
