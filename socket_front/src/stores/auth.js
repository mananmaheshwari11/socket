import {writable} from 'svelte/store';
import { goto } from '$app/navigation';
import axios from 'axios';

export const auth=writable({
    isAuthenticate:false,
    token:"",
    user:null
})

export function signin(data){
    auth.set({isAuthenticated:true,user:data.user,token:data.token});
    localStorage.setItem('auth',JSON.stringify(data));
     
} 

export function signout(){
    auth.set({ isAuthenticated:false,token:"",user:null});
    localStorage.removeItem('auth')  
    goto('/signin')
}


export async function SetHeader(){  // sets the header for passing the middleware
    const datax=localStorage.getItem('auth')
    if(datax){
        const auth=JSON.parse(datax)
        axios.defaults.headers.common['Authorization']=auth.token;
        const {data}=await axios.post('/api/auth/check-auth');
        if(data.ok){
            return true;
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }    
}