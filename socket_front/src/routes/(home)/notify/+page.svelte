<script>
    import Cover from '../../../component/cover.svelte'
    import '../../signup/style.css'
    import Homepage from '../../../component/Homepage.svelte';
    let rate=''
    let feedback=''
</script>
<Homepage>
<Cover>
    <form class="signup-form">
        <h1>Feedback|Grievances</h1>
        <div class="form-group">
            <label for="rating">Rate our app for your feedback</label>
            <input type="number"  bind:value={rate} min="0" max="5" placeholder="Rate your experience">
        </div>
        <div class="form-group">
            <label for="feedback">Grievance|Feedback</label>
            <input type="text"  bind:value={feedback} placeholder="Write your Suggestion">
        </div>
        <button type="submit" class="submit-btn">Submit</button>
    </form>
</Cover>
</Homepage>