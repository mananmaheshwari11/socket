<script>
    import Homepage from "../../../../component/Homepage.svelte";
    import axios from 'axios';
    import { onMount } from "svelte";
    import moment from "moment";
    let meet=[]
    let user=[]
    let selected={}
    let showDetail={}
    let filter="Meetings"
    let filteredmeet=[]
    let currentDate = new Date(); 
    let selectedMeetingId=''

    let isModalOpen = false;  
    let updatedTitle = '';
    let updatedDescription = '';
    let updatedMembers = '';
    let updatedstartTime='';

    function openModal(meet) {
        selectedMeetingId=meet._id;
        updatedTitle = meet.title;
        updatedDescription = meet.description;
        updatedMembers = meet.members;
        updatedstartTime=meet.startTime;
        isModalOpen = true;  
    }

    function closeModal() {
        isModalOpen = false;  
    }

    async function updateMeeting(meetId) {
        try {
            const response = await axios.put(`/api/meet/update/${meetId}`, {
                title: updatedTitle,
                description: updatedDescription,
                members: updatedMembers,
                startTime: updatedstartTime 
            });
            if (response.data.success) {
                const index = meet.findIndex(m => m._id === meetId);
                if (index !== -1) {
                    meet[index] = response.data.updatedMeet; 
                }
                closeModal();  
                window.location.reload()
            }
        } catch (error) {
            console.error("Error updating meeting:", error);
        }
    }
    onMount(async()=>{
        try {
            const token=localStorage.getItem('auth')
            const auth=JSON.parse(token)
            
            const {data}=await axios.get(`/api/meet/getallmeet/${auth.user}`)
            if(data.success){
                meet=data.meet
                filteredmeet=meet

            }
        } catch (error) {
            console.log(error)
        }
    })
    const getMeetDetails=async(id)=>{
        try {
            const {data}=await axios.get(`/api/meet/getuser/${id}`)
            if(data.success){
                selected[id]=data.meet
            }
        } catch (error) {
            console.log(error)
        }
    }
    function ViewDetails(id){
        showDetail[id]=!showDetail[id];
        if (showDetail[id]){
            getMeetDetails(id);
        }
    }
    function FilterMeetings(){
        if (filter==="Past Meetings"){
            filteredmeet=meet.filter(m => new Date(m.startTime) < currentDate)
        }
        else if(filter==="Scheduled Meetings"){
            filteredmeet=meet.filter(m => new Date(m.startTime) >= currentDate)
        }
        else if (filter === "Today Meetings") {
        filteredmeet = meet.filter(m => {
            const meetingDate = new Date(m.startTime);
            return (
                meetingDate.getDate() === currentDate.getDate() &&
                meetingDate.getMonth() === currentDate.getMonth() &&
                meetingDate.getFullYear() === currentDate.getFullYear()
            );
        });
    }
        else{
            filteredmeet=meet;
        }
    }
</script>
<Homepage>
    <div class="meet-head">
    <h1>{filter}</h1>
    <select bind:value={filter} on:change={FilterMeetings}>
        <option value="Meetings">Select Filter</option>
        <option value="Past Meetings">Past Meetings</option>
        <option value="Scheduled Meetings">Scheduled Meetings</option>
        <option value="Today Meetings">Today Meetings</option>
    </select>
</div>
    <ul>
      {#each filteredmeet as i}
      <li class="meet-list">
        {i.title}
        <button class="list-btn" on:click={ViewDetails(i._id)}>
            {showDetail[i._id]?"Hide Details":"View Details"}
        </button>
        {#if showDetail[i._id]}
        <hr/>
                <div class="details">
                    {#if selected[i._id]}
                        <p><strong>Description:</strong> {selected[i._id].description}</p>
                        <p><strong>Starts  On:</strong> {moment(selected[i._id].startTime).format("DD-MMM-YYYY HH:mm A")}</p>
                        <p><strong>Members:</strong> {selected[i._id].members}</p>
                        <p><strong>Join Code:</strong> {selected[i._id].joinCode}</p>
                    {#if filter === "Scheduled Meetings"}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <button class="meet-update-btn" on:click={() => openModal(selected[i._id])}>Update</button> 
                        <br>
                         {/if}
                    {:else}
                        <p>Loading details...</p>
                    {/if}
                </div>
            {/if}
      </li>
      {/each}
    </ul>

    {#if isModalOpen}
<div class="modal">
    <div class="modal-content">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="close" on:click={closeModal}>&times;</span>
        <h2>Update Meeting</h2>
        <form on:submit|preventDefault={() => updateMeeting(selectedMeetingId)}>
            <label for="title">Title:</label>
            <input class="form-input" type="text" bind:value={updatedTitle} />
            
            <label for="description">Description:</label>
            <input class="form-input" bind:value={updatedDescription}/>

            <label for="members">Members:</label>
            <input class="form-input" type="text" bind:value={updatedMembers} />

            <label for="members">Date Of Meeting</label>
            <input class="form-input" type="text" bind:value={updatedstartTime} />
            
            <button class="modal-btn" type="submit">Update</button>
        </form>
    </div>
</div>
{/if}

</Homepage>

<style>
    .meet-list{
        border: 2px solid white;
        list-style: none;
        padding-top: 15px;
        padding-bottom: 10px;
        font-size: 20px;
        padding-left: 5px;
        left: 0;
        margin-bottom: 20px;
        margin-right: 50px;
        border-radius: 5px;
        box-sizing: border-box;
        text-align: justify;
        overflow: hidden;
        position: relative;
        box-shadow: 1px 1px 1px 2px gray;
    }
    .list-btn{
        right:0;
        margin-right: 30px;
        top: 40%;
        color: blue;
        cursor: pointer;
        border: none;
        background-color: white;
        position: absolute;
}
.meet-update-btn{
    background-color: #007bff;
    border-radius: 5px;
    color: white;
    margin-bottom: 5px;
    margin-left: 5px;
    cursor: pointer;
    padding: 5px;
}
.details {
        margin-top: 5px;
        /* padding: 5px; */
        background-color: #f0f0f0;
        margin-right: 10px;
        border-radius: 5px;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        font-size: 18px;
    }
    h1{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        margin-left: 40px;
        font-size: 32px;
    }
    .meet-head{
        display: flex;
        /* flex-direction: row; */
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

    }
    select{
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 2px solid #3b3b3b;
        background-color: #fff;
        color: #333;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 50px;
    }
    select:hover {
    background-color: #f0f0f0;
    border-color: #555;
    }

    select:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
    
    .modal {
    display: flex;
    position: absolute;
    z-index: 1000;
    left: 0;
    top: 0;
    margin-left: 320px;
    margin-top: 90px;
    width: 450px;
    height: 90%;
    border-radius: 20px;

}
.modal-btn{
        padding: 10px 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
}
.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    border-radius: 20px;
    box-shadow: 2px 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
    form {
        display: flex;
        flex-direction: column;
        margin-right: 30px;
        width: 300px;
    }

    label {
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: normal; 
        color: #222; 
    }

    .form-input {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 14px;
    }
</style>

