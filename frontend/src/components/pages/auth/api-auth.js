const create = async(user)=>{
    try {
        let res = await fetch('/auth/signup/',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await res.json();

    } catch(err) {
        console.log(err);
    }
}
const signin = async (user) => {
    let response = await fetch('/auth/signin',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    })
    response = await response.json();
    if(response.success)
    {
        localStorage.setItem("t",response.token);
    }
    
    return response;
}
const signout = async (user) => {
    let response = await fetch('/auth/signout',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
    });
    response = await response.json();
    return response;
}
export {
    create,
    signin,
    signout
}