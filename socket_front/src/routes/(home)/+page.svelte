<script>
  import Homepage from "../../component/Homepage.svelte";
  import ImageCarousel from "../../component/ImageCarousel.svelte";
  import { SetHeader } from "../../stores/auth";
  import { goto } from '$app/navigation';
  import Icon from "@iconify/svelte";
  import {onMount} from 'svelte'
  let code=''
  let logged=false;
    onMount(async () => {
        logged = await SetHeader();
    });
  const signup=()=>{
    goto('/signup');
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
        <button class="meet-btn"><Icon icon="material-symbols:video-call-outline"  style="color: white" />New Meeting</button>
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
    <hr>
    <h5 style="font-family: sans-serif;">All Rights Reserved &copy; MAK</h5>
  </div>
    <div class="right-content">
      <ImageCarousel/>
    </div>
  </div>
  </Homepage>
  <style>
    .main-content{
      display: flex;
      flex-direction: row;
      justify-content:space-between;
    }
    .right-content{
      margin-left: 40px;
      margin-top: 30px;
    }
    .left-content{
      margin-top: 120px;
      word-break: normal;
      overflow-wrap: break-word;
      margin-left: 30px;
    }
    .main-title{
      font-size: 50px;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    }
    .main-subtitle{
      margin-top: 20px;
      font-family:cursive;
      font-style: normal;
      font-style: normal;
    }
    .main-btns{
      display: flex;
      flex-direction: row;
    }
    .meet-btn{
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
    }
    .meeting-code-input{
        font-size: 17px;
        border: 1px solid black;
        margin-right: 10px;
    }
 
    .join-btn{
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
    border:none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  hr{
    margin-top: 30px;
  }
  </style>