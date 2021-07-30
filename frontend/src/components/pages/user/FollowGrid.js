import React , {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import {Link} from 'react-router-dom'
import ImageList from '@material-ui/core/ImageList'
// import ImageListTile from '@material-ui/core/GridListTile'
// import { ImageListTile } from '@material-ui/core'
// import ImageListTile from '@material-ui/core/ImageListTile'
import ImageListItem from '@material-ui/core/ImageListItem';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  gridList: {
    width: 500,
    height: 220,
  },
  tileText: {
    textAlign: 'center',
    marginTop: 10
  }
}))
export default function FollowGrid (props) {
  const classes = useStyles()
//   const photoUrl = values.user._id
//     ? `/api/users/photos/${values.user._id}?${new Date().getTime()}`
//     : undefined
    const [people, setPeople] = useState([])
    const [loading, setloading] = useState(true)
    useEffect(() => {
        setloading(false)
        setPeople(props.people)
        // setloading(false)
        // return () => {
        //     setloading(false);
        // }
    }, [props.people])
    if(loading)
    return <h5>loading..</h5>
    return (<div className={classes.root}>
      <ImageList rowHeight={160} className={classes.gridList} cols={3}>
        {people && people.map((person, i) => {
           return  <ImageListItem style={{'height':120}} key={i}>
              <Link to={"/users/" + person._id} style={{textDecoration: 'none', color: '#6C63FF'}}>
                <Avatar src={'/api/users/photos/'+person._id} className={classes.bigAvatar}/>
                <Typography className={classes.tileText}>{person.name}</Typography>
              </Link>
            </ImageListItem>
        })}
      </ImageList>
    </div>)
}

FollowGrid.propTypes = {
  people: PropTypes.array.isRequired
}