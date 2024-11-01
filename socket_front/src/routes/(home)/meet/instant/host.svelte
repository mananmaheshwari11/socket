<script>
    import { io } from 'socket.io-client';
    let socket = io('/api');
    let pendingUsers = [];

    // Listen for new user join requests
    socket.on('verify-member', ({ name }) => {
        pendingUsers.push(name);
        console.log(`User ${name} wants to join the meeting`);
    });

    function approveMember(name) {
        socket.emit('approve-member', { name, approved: true });
        console.log(`User ${name} approved for meeting`);
    }

    function rejectMember(name) {
        socket.emit('approve-member', { name, approved: false });
        console.log(`User ${name} rejected for meeting`);
    }
</script>

<!-- Host's UI to approve/reject members -->
{#each pendingUsers as user}
    <div>
        <p>{user.userId} wants to join the meeting</p>
        <button on:click={() => approveMember(user.name)}>Approve</button>
        <button on:click={() => rejectMember(user.name)}>Reject</button>
    </div>
{/each}
