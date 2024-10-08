<script>
	import axios from "axios";
	import { getUser } from "../stores/auth";

    let title = null;
    let description = null;
    let members = [];  
    let date = '';
    let time = '';
    let showModal = false;  
    let newMember = ''; 
    let startTime=null;
    const host=getUser();
    function addMember() {
        if (newMember.trim() !== '') {
            members=[...members,newMember];
            newMember = ''; 
        }
    }

    function removeMember(index) {
        members = members.filter((_, i) => i !== index);
    }

    function toggleModal() {
        showModal = !showModal;  
    }

    async function createMeet(){
        try {
            if(date && time){
                startTime=new Date(`${date}T${time}`)
            }
            const {data}=await axios.post(`/api/meet/create/${host.user}`,{title,description,members,startTime})
            if(data.success){
                console.log("meet scheduled successfully")
            }
        } catch (error) {
            console.log(error)
        }
    }
</script>

<style>
    .container {
        max-width: 400px;
        margin-right: 60px;
        padding: 20px;
        border-radius: 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
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

    .form-row {
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    .form-row input {
        width: 48%;
    }

    button {
        padding: 10px 20px;
        background-color: #007BFF;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }

    button:hover {
        opacity: 0.6;
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin-right: 40px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 350px;
    }
    .modal-content input{
        margin-right: 20px;
        width: 90%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #837e7e;
        border-radius: 5px;
        font-size: 14px;
        outline: none;
    }
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .link-style {
        background: none;
        border: none;
        color: #007BFF;
        font-size: 14px;
        cursor: pointer;
        text-decoration: underline;
    }

    .link-style:hover {
        opacity: 0.8;
    }

    .no-margin {
        margin: 0;
        padding: 0;
    }
    .modal-head{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }
    .modal-close{
        background-color: white;
        font-size: 20px;
        color: #222;
    }
    .display{
        margin: 5px;
        list-style: none;
    }

    input[type="time"], input[type="date"] {
    width: 70%;  
    padding-right: 10px; 
}
</style>

<div class="container">
    <form on:submit|preventDefault={createMeet}>
        <h2>Schedule Meeting</h2>
        <label for="name">Name</label>
        <input class="form-input" bind:value={title} type="text" placeholder="Enter your Title" />

        <label for="phone">Description</label>
        <input class="form-input" bind:value={description} type="text" placeholder="Enter meeting description" />


            <div class="modal-head">
            Members
            <button class="link-style no-margin" type="button" on:click={toggleModal}>Add Member</button>
    </div>
    <br>
        <div class="form-row">
            <div>
                <label for="date">Date</label>
                <input class="form-input" bind:value={date} type="date" required />
            </div>
            <div>
                <label for="time">Time</label>
                <input class="form-input" bind:value={time} type="time" required />
            </div>
        </div>

        <button type="submit">Create</button>
    </form>
</div>

<!-- Modal for adding members -->
{#if showModal}
    <div class="modal">
        <div class="modal-content">
            <div class="modal-head">
            <h3>Add Members</h3>
            <button type="button" class="modal-close" on:click={toggleModal}>&times;</button>
            </div>
            <input  bind:value={newMember} type="text" placeholder="Enter  member's email id" />
            {#each members as member, index}
                <div class="modal-head display">
                    <li>{member}</li> 
                    <button class="link-style no-margin" type="button" on:click={() => removeMember(index)}>Remove</button>
                </div>
            {/each}
            <hr/>
            <div class="modal-footer">
            <button type="button" on:click={addMember}>Add</button>
            </div>
            <label for="model">Members get notified for meeting via email. Ensure correct email address</label>

        </div>
    </div>
{/if}
