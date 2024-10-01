<script>
	import Cover from "../../component/cover.svelte";
    import '../signup/style.css';
    import axios from 'axios';
    import { goto } from '$app/navigation';
	import { signin } from "../../stores/auth.js";
    let password=''
    let email=''
    const handleSignin=async()=>{
        const {data}=await axios.post('/api/auth/login',{email,password})
        if(data.success){
            signin(data)
            goto('/')
        }
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
    <p>New User? <a href="/signup" class="cover-link">SignUp</a> Here</p>
</form>

</Cover>