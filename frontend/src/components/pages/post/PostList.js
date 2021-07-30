import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Post from './Post'

export default function PostList (props) {
    // const [posts, setPosts] = useState([])
    useEffect(()=>{
        return function cleanup() {
            return true;
        }
    },[props.posts])
    return (
      <div style={{marginTop: '24px'}}>
        {props.posts.map((item, i) => {
            return <Post post={item} key={i} onRemove={props.removeUpdate}/>
          })
        }
      </div>
    )
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}