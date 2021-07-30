import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {unfollow, follow} from './api-user.js'
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

function FollowButton({onButtonClick, following}) {
    function followClick() {
        onButtonClick(follow);
    }
    function unfollowClick() {
        onButtonClick(unfollow);
    }
    return (
        <div>
            {following?(
                <Button variant="contained" color="black" onClick={unfollowClick}>Unfollow</Button>
            ):(
                <Button variant="contained" style={{backgroundColor: '#6C63FF', color: 'white'}} onClick={followClick}>Follow</Button>
            )}
        </div>
    )
}

FollowButton.propTypes = {
    following: PropTypes.bool.isRequired,
    onButtonClick: PropTypes.func.isRequired,
}

export default FollowButton
