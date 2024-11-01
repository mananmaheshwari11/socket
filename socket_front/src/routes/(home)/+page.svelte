<script>
  import Homepage from "../../component/Homepage.svelte";
  import ImageCarousel from "../../component/ImageCarousel.svelte";
  import { SetHeader } from "../../stores/auth";
  import { goto } from '$app/navigation';
  import Icon from "@iconify/svelte";
  import {onMount} from 'svelte'
	import MeetForm from "../../component/MeetForm.svelte";
  // import { connectSocket } from "../../stores/meet"
  let meetCreate=false;
  let code=''
  let dropdownVisible = false;
  let logged=false;
    onMount(async () => {
        logged = await SetHeader();
    });
  const signup=()=>{
    goto('/signup');
  }
  function toggleDropdown() {
    dropdownVisible = !dropdownVisible;
  }
  
  function closeDropdown() {
    dropdownVisible = false;
  }
</script>

<Homepage>
  <div class="main-content">
    <div class="left-content">
      <div class="left-text">
        <span class="main-title">Secure video </span><br>
        <span class="main-title">conferencing for</span><br>
        <span class="main-title">everyone </span>
        <h2 class="main-subtitle">Collaborate and celebrate from anywhere with Connect app</h2>

        {#if logged}
        <div class="main-btns">
          <div class="dropdown">
            <button class="meet-btn" on:click={toggleDropdown}>
              <Icon icon="material-symbols:video-call-outline" style="color: white" /> New Meeting
            </button>
            {#if dropdownVisible}
              <div class="dropdown-menu">
                <button class="dropdown-item" on:click={()=>{meetCreate=!meetCreate; closeDropdown();}}>
                  <Icon icon="mdi:calendar-outline" width="1.2em" height="1.2em" /> Schedule a Meeting
                </button>
                <hr>
                <button class="dropdown-item" on:click={()=>{closeDropdown(); goto('/meet/instant')}}>
                  <Icon icon="ic:twotone-plus" width="1.2em" height="1.2em" /> Start an Instant Meeting
                </button>
              </div>
            {/if}
          </div>
          <input
            type="text"
            placeholder="Enter a code or nickname"
            bind:value={code}
            maxlength="6"
            class="meeting-code-input"
          />
          <button class="join-btn" disabled={code.length!==6}>Join</button>
        </div>
        {:else}
        <button on:click={signup} class="meet-btn">Get Started with Connect</button>
        {/if} 
      </div>
      <hr class="hr">
      <h5 style="font-family: sans-serif;">All Rights Reserved &copy; MAK</h5>
    </div>
    <div class="right-content">
      {#if !meetCreate}
      <ImageCarousel/>
      {:else}
      <MeetForm/>
      {/if}
    </div>
  </div>
</Homepage>

<style>
  .main-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .right-content {
    margin-top: 30px;
  }

  .left-content {
    margin-top: 120px;
    word-break: normal;
    overflow-wrap: break-word;
    margin-left: 30px;
  }

  .main-title {
    font-size: 50px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    cursor: default;
  }

  .main-subtitle {
    margin-top: 20px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-style: normal;
    color: rgb(55, 52, 52);
    cursor: default;
  }

  .main-btns {
    display: flex;
    flex-direction: row;
  }

  .meet-btn {
    background-color: #1a73e8;
    color: white;
    font-size: 20px;
    padding: 10px 20px;
    border: none;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 15px;
    display: flex;
    align-items: center;
    position: relative;
  }

  .meeting-code-input {
    font-size: 17px;
    border: 1px solid black;
    margin-right: 10px;
  }

  .join-btn {
    border: none;
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-left: 5px;
    background-color: white;
    cursor: not-allowed;
  }

  .join-btn:enabled {
    background-color: #1a73e8;
    padding-left: 20px;
    padding-right: 20px;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-menu {
    display: block;
    position: absolute;
    background-color: white;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
    z-index: 1;
    top: -80px; /* Position above the "New Meeting" button */
    left: 0;
    width: 200px;
    padding: 0;
  }

  .dropdown-item {
    background-color: white;
    border: none;
    padding: 15px;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }

  .dropdown-item:hover {
    background-color: #f0f0f0;
  }

  hr {
    margin: 0;
    border: none;
    border-top: 1px solid #ccc;
  }
  .hr{
    margin-top: 30px;
  }
</style>
