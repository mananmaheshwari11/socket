<script>
    import {io} from 'socket.io-client'
    import {getUser} from '../../../../stores/auth'
    import { goto } from '$app/navigation';
	import axios from 'axios';
    import Icon from '@iconify/svelte'
    import '../../../../stores/meetLayout.css';
	import { onMount } from 'svelte';
    import moment from 'moment';
    import {checkMeeting, connectSocket, getMeeting, setMeeting} from '../../../../stores/meet'
    let socket;
    let code='';
    let auth= getUser();
    let name='';
    async function instantMeeting() {
    try{
        const res=await axios.get(`/api/auth/user-detail/${auth.user}`)
        console.log(res.data)
    if(checkMeeting()){
        const {data}=await axios.post(`/api/meet/create/${auth.user}`,{startTime:moment().toDate()})
        if(data.success){
            setMeeting(data.meet.joinCode);
            connectSocket(data.meet.joinCode,res.data.user._id,res.data.user.name);
        }
        else{
            alert('Unable to create instant meet at this instance');
            goto('/');
        }
    }
    else{
        const joinCode=getMeeting();
        connectSocket(joinCode,res.data.user._id,res.data.user.name);
    }
    }catch(error){
        console.log("User data is secret")
    }
}
instantMeeting()
</script>
<body>
<div class="video">
    <div class="video-grid" id="video-grid">

    </div>
</div>

<div class="controls">
    <button id="toggleAudio"><Icon icon="ant-design:audio-filled" width="1.2em" height="1.2em" /></button>
    <button id="toggleVideo"><Icon icon="mynaui:video" width="1.2em" height="1.2em" /></button>
    <button id="leaveButton"><Icon icon="ic:round-call-end" width="1.2em" height="1.2em" /></button>
</div>
</body>