    <script>
        import Cover from './cover.svelte';
        import {goto} from '$app/navigation';
        const handleSignup=()=>{
            goto('/signup')
        }
    </script>
    <Cover>
    <h1 class="cover-heads">Welcome to Connect</h1>
    <!-- <h2 class="cover-subheads">Lets Connect the World</h2> -->
    <button class="cover-btn" on:click={handleSignup}>Get Started</button>
    <h2 class="cover-text">Alone we can do so little, together we can do so much</h2>
    <h2 class="cover-quote">-Hellen Killer</h2>
    </Cover>
