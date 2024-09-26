<script>
    import Cover from "../cover.svelte";
    import './style.css';
    import axios from 'axios';
    import { goto } from '$app/navigation';
    let name=''
    let email=''
    let phone=''
    let password=''
    let cfmpwd=''
    const handleSignup=async()=>{
        console.log(name,email,phone,password,cfmpwd)
        // const data=await axios.post('/api/auth',name,email,phone,password);
        // data handler to be written
        goto('/signin')
    }
</script>

    <Cover>
<form class="signup-form" on:submit|preventDefault={handleSignup}>
    <h1>Sign up to Connect</h1>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" bind:value={name} placeholder="Enter your name" required>
    </div>

    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" bind:value={email} placeholder="Enter your email" required>
    </div>

    <div class="form-group">
        <label for="phone">Phone</label>
        <input type="tel" id="phone" bind:value={phone} placeholder="Enter your phone number" required>
    </div>

    <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" bind:value={password} placeholder="Enter your password" required>
    </div>

    <div class="form-group">
        <label for="password">Confirm Password</label>
        <input type="password" id="cfmpassword" bind:value={cfmpwd} placeholder="Confirm password" required>
    </div>

    <button type="submit" class="submit-btn">Submit</button>
</form>
    </Cover>