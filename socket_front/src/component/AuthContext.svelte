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