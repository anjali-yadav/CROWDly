const list = async()=> {
    try {
      let response = await fetch('/api/users/', {
        method: 'GET',
      })
      return await response.json()
    } catch(err) {
      console.log(err)
    }
} 

const read = async(params,credentials)=> {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const update = async (params, credentials, user) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: user
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const remove = async (params, credentials) => {
  try {
    let response = await fetch('/api/users/' + params.userId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}

const follow = async (params, credentials, followId)=>{
  // console.log(params.userId);
  // console.log(credentials.t);
  // console.log(followId);
  try{
    let response = await fetch('/api/users/follow/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId: params.userId, followId: followId})
    })
    // console.log(response);
    return await response.json()
  } catch (err){
    console.log(err)
  }
}

const unfollow = async (params, credentials, unfollowId) => {
  try{
    let response = await fetch('/api/users/unfollow/',{
      method: 'PUT',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + credentials.t
      },
      body: JSON.stringify({userId:params.userId, unfollowId: unfollowId})
    })
    // console.log(response);
    return await response.json()
  } catch (err) {
    console.log(err)
  }
}
const findPeople = async (params, credentials, signal) => {
  try {
    let response = await fetch('/api/users/findpeople/' + params.userId, {
    method: 'GET',
    signal: signal,
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + credentials.t
    }
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}
export  {
  list,
  read,
  update,
  remove,
  follow,
  unfollow,
  findPeople
}