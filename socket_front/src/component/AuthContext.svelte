<script>
    import { onMount } from "svelte";
    import { SetHeader } from "../stores/auth.js";
    import { goto } from '$app/navigation';
     let isLoading=true
     let isAuthorized=false
     let LoadingMessage="Checking the Authorization... "
    onMount(()=>{
        const isAuthenticated=SetHeader();
        if(isAuthenticated){
            isAuthorized=true;
        }
        else{
            LoadingMessage="Authorization Failed! Redirecting"
            setTimeout(()=>{
                goto('/signin')
            },2000)
        }
        isLoading=false;
    })
</script>
    {#if isLoading}
        <div class='spinner'>
            <p>{LoadingMessage}</p>
            </div>
    {:else if isAuthorized}
            <slot></slot>
    {/if}

<style>
    .spinner {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        font-size: 1.2em;
    }
</style>



<!-- <script>

	import { onMount } from "svelte";
    import { io } from 'socket.io-client'
	import { getUser } from "../../../../stores/auth";
	import axios from "axios";
    let meetId='';
    let joinCode='';
    const auth=getUser();
    const userId=auth.user;
    const startTime=new Date()
    async function createInstantMeet() {
        try{
        const {data}=await axios.post(`/api/meet/create/${auth.user}`,{startTime})
        if(data.success){
            meetId=data.meet._id
            joinCode=data.meet.joinCode
        }
        const socket=io('/api')
        socket.emit('join-meet',{joinCode,meetId,userId});

        socket.on('join-approved',(message)=>{
            console.log("User Approved ")
            alert('Join approved',message)
        })

        socket.on('join rejected',()=>{
            alert("Join get rejected")
        })

    }
    catch(error){
        console.log(error)
    }
}
</script> -->
