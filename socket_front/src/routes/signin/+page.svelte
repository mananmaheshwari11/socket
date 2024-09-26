<script>
	import Cover from "../cover.svelte";
    import '../signup/style.css';
    import axios from 'axios';
    import { goto } from '$app/navigation';
    let password=''
    let email=''
    const handleSignin=()=>{

    }
</script>
<Cover>
<form class="signup-form" on:submit|preventDefault={handleSignin}>
    <h1>Sign in to Connect</h1>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} placeholder="Enter your email" required>
    </div>
    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} placeholder="Enter your password" required>
    </div>
    <button type="submit" class="submit-btn">Log-In</button>
</form>

</Cover>