<script>
    // import AuthContext from "../../component/AuthContext.svelte";
    import moment from 'moment';
    import {onMount} from 'svelte'
    import Icon from '@iconify/svelte';
    import { SetHeader } from "../stores/auth";
    import DropDown from './DropDown.svelte';
    let currentTime=moment().format('hh:mm A')
    let currentDate = moment().format('ddd, MMM D');
    let logged=false;
    let isDropdownOpen = false; 

    function toggleDropdown() {
    isDropdownOpen = !isDropdownOpen; 
    }
    onMount(async () => {
        logged = await SetHeader();
    });
</script>
     <header>
      <div class="head-content">
      <div class="head-left">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img class='image-logo' src="/logo.jpeg" alt="image">
      <span class="logo-head">
        Connect
      </span>
    </div>
    <div class="head-right">
      <span class="date-time">{currentTime} • {currentDate}</span>
      <a href="/"><Icon icon="ic:sharp-home" width="24" height="24"  style="color: black" /></a>
      <a href="/about"><Icon icon="octicon:question-24" width="24" height="24" style="color: black"/></a>
      <a href="/notify"><Icon icon="bxs:message-error" width="24" height="24"  style="color: black" /></a>
      {#if logged}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
       <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <a href="/settings"><Icon icon="solar:settings-linear" width="24" height="24" style="color: black" /></a>
      <!-- svelte-ignore a11y-click-events-have-key-events -->
       <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <a on:click={toggleDropdown} style="cursor: pointer;">
     <Icon icon="solar:user-bold" width="24" height="24"  style="color: black" /><DropDown  isOpen={isDropdownOpen} />
      </a>
      <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-missing-content -->
      <a></a>
      {:else}
      <a href="/signup"><button class="head-btn" style="background-color: #24a0ed; border:none; color:white;">SignUp</button></a>
      <a href="/signin"><button class="head-btn">SignIn</button></a>
      {/if}
    </div>
    </div>
  </header>

    <slot>

    </slot>
<style>
  .head-content{
    display: flex;
    justify-content: space-between;
  }
  .image-logo{
    height: 80px;
  }
  .logo-head{
    font-size: 30px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    margin-top: 20px;
    cursor: default;
  }
  .head-left{
    display: flex;
    flex-direction: row;
  }
  .head-right{
    display: flex;
    flex-direction: row;
    gap: 22px;
    align-items: center;
  }
  a:hover{
    background-color: rgb(231, 230, 230) ;
    opacity: 0.8;
    border-radius: 20px;

  }
  .date-time{
    font-size: 20px;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: rgb(55, 52, 52);
    cursor: default;
  }
  .head-btn{
    padding: 10px;
    font-size: 20px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    border-radius: 16px;
  }
</style>
  
