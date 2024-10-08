<script>
    import Icon from "@iconify/svelte";
	import Homepage from "../../../component/Homepage.svelte";
	import { onDestroy, onMount } from "svelte";
	import axios from "axios";
	import { getUser } from "../../../stores/auth";
    let audioinput = [];
    let videodevice = [];
    let audiooutput=[];
    let selectedAudioInput = '';
    let selectedAudioOutput = '';
    let selectedVideoInput = '';
    let videovoice=false;
    let stream;
    let videoElement; 
    let activesection='video';
    let name='';
    let phone='';
    let image='';
    const auth=getUser();
    
    


    function toggleSettingModal() {
        getMediaDevice();
    }

    async function getuserDetails() {
        try {
        const {data}=await axios.get(`/api/auth/user-detail/${auth.user}`)
        if(data.success){
            name=data.user.name;
            phone=data.user.phone;
            image=data.user.image;
        }
        } catch (error) {
            console.log(error)
        }

    }
    async function updateUser(){
        try {
            const userdata=new FormData()
            userdata.append("name",name)
            userdata.append("phone",phone)
            userdata.append("image",image)

            const {data}=await axios.put(`/api/auth/update-user/${auth.user}`,userdata);
            if(data.success){
                name=data.user.name;
                phone=data.user.phone;
                image=data.user.image;
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getMediaDevice() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
            
            const devices = await navigator.mediaDevices.enumerateDevices();
            audioinput = devices.filter(device => device.kind === 'audioinput');
            videodevice = devices.filter(device => device.kind === 'videoinput');
            audiooutput= devices.filter(device=>device.kind==='audiooutput');

            selectedAudioInput = audioinput.length > 0 ? audioinput[0].deviceId : '';
            selectedVideoInput = videodevice.length > 0 ? videodevice[0].deviceId : '';
            selectedAudioOutput = audiooutput.length > 0 ? audiooutput[0].deviceId : '';

            if (videoElement) {
                videoElement.srcObject = stream;
            }
        } catch (error) {
            console.error('Error accessing media devices:', error);
        }
    }

    function stopVideoStream() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    }
    
    function testSpeaker() {
        const audio = new Audio('/message-tone.mp3'); 
        audio.setSinkId(selectedAudioOutput).then(() => {
            audio.play().catch(err => console.error('Error playing audio:', err));
        }).catch(err => console.error('Error setting sink ID:', err));
    }

    function videoVoice(){
        if(videovoice){
            videoElement.muted=true
        }
        else{
            videoElement.muted=false
                }
    }

    onDestroy(() => {
        stopVideoStream();
    });

    toggleSettingModal();
    getuserDetails();

</script>
    <Homepage>
    <div class="container">
    <div class="sidebar">
        <div class="side-head">
            <h2>
                <Icon icon="uil:setting"  style="color: black" /> Settings</h2>
        </div>
        <div class="side-content">
            <li><button on:click={()=>{window.location.reload();activesection='video'; }}>
                <Icon icon="mynaui:video-solid"  style="color: black" /> Video</button></li>
            <li><button on:click={()=>activesection='audio'}>
                <Icon icon="rivet-icons:audio"  style="color: black" /> Audio</button></li>
            <li><button on:click={()=>activesection='general'}>
                <Icon icon="solar:user-bold-duotone"  style="color: black" /> General</button></li>
        </div>
    </div>
        <!-- Audio Section -->
    <div class="main-content">
        {#if activesection==='audio'}
        <section>
            <h2>Audio Settings</h2>
            <div class="audio-section">
                <label for="microphone">
                    <Icon icon="bxs:microphone" /> Microphone
                </label>
                <select id="microphone" bind:value={selectedAudioInput}>
                    {#each audioinput as device}
                        <option value={device.deviceId}>{device.label}</option>
                    {/each}
                </select>

                <label for="speaker">
                    <Icon icon="material-symbols:speaker-outline" />Speaker
                </label>
                <select id="speaker" bind:value={selectedAudioOutput}>
                    <!-- You may also want to filter audio outputs (audiooutput) if needed -->
                    {#each audiooutput as device}
                        <option value={device.deviceId}>{device.label}</option>
                    {/each}
                </select>
                <button class="test-btn" on:click={testSpeaker}>Test</button>
                <span>Having trouble with this step?<a href="/notify">Contact Us</a></span>
            </div>
        </section>
        {/if}
        <!-- Video Section -->
         {#if activesection==='video'}
        <section>
            <h2>Video Settings</h2>
            <div class="video-section">
                <label for="camera">
                    <Icon icon="mdi:video" /> Camera
                </label>
                <select id="camera" bind:value={selectedVideoInput}>
                    {#each videodevice as device}
                        <option value={device.deviceId}>{device.label}</option>
                    {/each}
                </select>
                <div class="camera-preview">
                    <!-- svelte-ignore a11y-media-has-caption -->
                    <video id="video" autoplay bind:this={videoElement} playsinline></video>
                </div>
                <button class="video-test-btn" on:click={()=>{videovoice=!videovoice; videoVoice()}} >
                    {#if videovoice}
                    <Icon icon="ph:microphone-slash-bold" /> 
                    {:else}
                    <Icon icon="ph:microphone-bold" /> 
                    {/if}
                </button>
                <span>Getting Trouble with Setting?<a href="/notify">Contact Us</a></span>
            </div>
        </section>
        {/if}

        <!-- General Section -->
         {#if activesection==='general'}
        <section>
            <h2>General Settings</h2>
            <div class="general-section">
                <form on:submit={updateUser}>
                    <label for="name">Name</label>
                    <input class="form-input" bind:value={name} type="text" placeholder="Enter your Name"/>
                    <label for="phone">Phone Number</label>
                    <input class="form-input" bind:value={phone} type="text" placeholder="Enter your Phone Number"/>
                    <label for="image">Profile Image</label>
                    {#if image}
                    <img src={`/api/auth/image/${auth.user}`} height="50" width="50" alt="preview"/>
                    {/if}
                    <input class="form-input" bind:value={image} type="file" placeholder="Enter your Image"/>
                    <button type="submit">Save</button>
                    <button>Cancel</button>
                </form>
            </div>
        </section>
        {/if}
    </div>
</div>
</Homepage>
<style>
    .container {
    display: flex;
    min-height: 85vh; 
    }
    .main-content {
    flex-grow: 1; 
    padding: 20px;
    background-color: white;
    margin-left: 220px; 
    box-shadow:  0px 0 5px rgba(0, 0, 0, 0.1);

    }
    .main-content h2{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 24px;
        margin-top: 20px;
    }

    .sidebar{
        width: 220px;
        height: 85vh;
        display: flex;
        position: absolute;
        flex-direction: column;
        top: 10;
        left: 2;
        padding: 10px;
        box-sizing: border-box;
        border-top: none;
        box-shadow:  0px 0 5px rgba(0, 0, 0, 0.1);
    }
    .side-head{
        font-size: 20px;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .side-content{
        list-style: none;   
    }
    .side-content li{
        margin-top: 15px;
        display: block;
    }
    .side-content li button{
        border: none;
        background-color: white;
        font-size: 18px;
        padding-left: 30px;
        padding: 10px 20px;
        cursor: pointer;
        padding-right: 40px;
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
    }
    .side-content li button:hover{
        border: none;
        background-color: #f1f1f1;
        font-size: 18px;
    }
    label {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    color: #333; 
    font-weight: bold;
}
    span{
        margin-top: 10px;
        font-family: Arial, Helvetica, sans-serif;
    }
    span>a{
        color: black;
    }
    section {
        margin-bottom: 20px;
    }

    .audio-section, .video-section {
        display: flex;
        flex-direction: column;
    }

    .camera-preview video {
        width: 40%;
        max-height: 300px;
        transform: scaleX(-1);
        background: black;
    }

    .audio-section select{
        margin-right: 500px;
        padding: 12px;
        margin-bottom: 10px;
        border: 2px solid rgb(192, 192, 197);
        outline: none;
    }
    .video-section select{
        margin-right: 400px;
        margin-bottom: 40px;
        padding: 12px;
        border: 2px solid rgb(192, 192, 197);
        outline: none;
    }

form {
    background-color: #f9f9f9; 
    padding: 20px;
    max-width: 400px; 
    margin: 20px auto; 
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
    font-family: 'Arial', sans-serif; 
}

.form-input {
    width: 100%; /* Full width, but within the form's max-width */
    padding: 10px;
    margin-bottom: 15px;
    font-size: 16px;
    border: 1px solid #ccc; /* Gray border */
    border-radius: 4px;
    box-sizing: border-box;
    transition: border-color 0.3s ease; /* Smooth transition for border */
}

.form-input:focus {
    outline: none;
    border-color: #888; /* Light gray outline on focus */
    box-shadow: 0 0 5px rgba(136, 136, 136, 0.5); /* Subtle shadow on focus */
}

input[type="file"] {
    padding: 5px;
}

.general-section button {
    background-color: #007bff; /* Blue background */
    color: white; /* White text */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth transition */
    margin-right: 10px; /* Space between buttons */
}

button:hover {
    background-color: #0056b3; /* Darker blue on hover */
}

form >button {
    display: inline-block;
    margin-top: 10px;
}

@media (max-width: 500px) {
    form {
        padding: 15px;
    }

    .form-input {
        font-size: 14px;
    }

    form >button {
        padding: 8px 15px;
    }
}

.test-btn{
    margin-left: 0px;
    width: 10%;
    display: block;
    background-color: #007bff; /* Blue background */
    color: white; /* White text */
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth transition */
    margin-right: 10px; /* Space between buttons */
}

.video-test-btn{
    margin-left: 0px;
    width: 10%;
    /* display: block; */
    background-color: #007bff; /* Blue background */
    color: white; /* White text */
    border: none;
    padding: 15px 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 90px;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Smooth transition */
    /* margin-right: 10px; */
}
</style>
