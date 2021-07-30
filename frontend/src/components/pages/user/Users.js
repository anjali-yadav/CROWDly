import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ArrowForward from '@material-ui/icons/ArrowForward'
import {Link} from 'react-router-dom'
import {list} from './api-user.js'

const useStyles = makeStyles(theme => ({
    root: theme.mixins.gutters({
      padding: theme.spacing(1),
      margin: theme.spacing(5)
    }),
    link: {
      textDecoration: "none",
      color: "blue",
    },
    title: {
      margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
      color: theme.palette.openTitle
    }
}))

function Users() {
    const classes = useStyles();
    const [users, setUsers]= useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() =>{
        setLoading(true);
        list()
        .then((data)=>{
            if(data && data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        })
        return function cleanup() {
            setLoading(false);
        }
    },[])
    return (
        <Paper className={classes.root} elevation={4}>
        <List dense>
         { users && users.map((item, i) => {
          return <Link to={"/users/" + item._id} className={classes.link} key={i}>
                    <ListItem button>
                      <ListItemAvatar>
                        <Avatar src={`/api/users/photos/${item._id}`}>
                          {/* <Person/> */}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name}/>
                      <ListItemSecondaryAction>
                      <IconButton>
                          <ArrowForward/>
                      </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                 </Link>
               })
             }
        </List>
      </Paper>
    )
}

export default Users
