import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";

export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    }
}
export const authSuccess = (token,userId) =>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        authData : token,
        userId :userId
    }
}
export const authFail = (error) =>{
    return {
        type:actionTypes.AUTH_FAIL,
        error : error
    }
}

export const checkAuthTimeout=(expireTime)=>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(authLogout())
        },expireTime )
    }
}

export const auth =(email, password) =>{
    return dispatch =>{
        dispatch(authStart())
        const authData ={
            email:email,
            password: password
        }
        axios.post('posts',authData)
            .then(r =>{
                console.log(r);
                localStorage.setItem('token','sasdajsddsfhbdsfsdf')
                localStorage.setItem('expire_date', 450000)
                dispatch(authSuccess({
                    token:'sasdajsddsfhbdsfsdf',
                    userId: 1
                }))
                //dispatch(checkAuthTimeout(3000))

            })
            .catch(err=>{
                console.log(err);
                dispatch(authFail(err.message))
            })
    }
}

export const authLogout =() =>{
    localStorage.removeItem('token',)
    localStorage.removeItem('expire_date',)
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}



