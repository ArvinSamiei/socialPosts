import backend from '../apis/backend'

export const login = (state) => {
    console.log('state is : ', state)
	return { type: "LOGIN", payload: state };
};

export const currentUser = (token) => {
    return function(dispatch) {
		backend.get('api/accounts/currentUser', {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then(r => {
            dispatch({ type: 'CURRENT_USER', payload: r.data })
        })
	};
}

export const getUsersFollowing = (token) => {
    return function(dispatch) {
		backend.get('api/accounts/followingUsers/', {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then(r => {
            console.log(r.data)
            dispatch({ type: 'FOLLOWING_USERS', payload: r.data })
        })
	};
}

export const followingChannels = (token) => {
    return function(dispatch) {
		backend.get('api/accounts/followingChannels/', {
            headers: {
                Authorization: `Token ${token}`
            }
        }).then(r => {
            console.log(r.data)
            dispatch({ type: 'FOLLOWING_CHANNELS', payload: r.data })
        })
	};
}

export const uploadimage = (token, picture) => {
    return function(dispatch) {
        var formData = new FormData();
        formData.append("image", picture[0]);
		backend.put('api/accounts/uploadImage/', formData, {
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "multipart/form-data",
            }
        }).then(r => {
            console.log(r.data)
            dispatch(currentUser(token))
        })
	};
}

export const getUser = (id, token) => {
    return function(dispatch) {
		backend.get(`api/accounts/${id}/`, {
            headers: {
                Authorization: `Token ${token}`,
            }
        }).then(r => {
            console.log(r.data)
            dispatch({ type: 'USER', payload: r.data })
        })
	};
}