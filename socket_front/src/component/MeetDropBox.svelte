<!-- Dropdown.svelte -->
<script>
    import Icon from "@iconify/svelte";
    export let isOpen = false; // Props
  </script>
    {#if isOpen}
    <ul class="dropdown-list">
      <a href="#"><li><Icon icon="ic:round-meeting-room" width="24" height="24"  style="color: black" />
        My Meetings</li></a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <a><li><Icon icon="uit:signout" width="24" height="24"  style="color: black" />
      Signout</li></a>
    </ul>
  {/if}
  
  <style>
    .dropdown-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      position: absolute;
      width: 150px;
      right:0;
    }
  
    .dropdown-list li {
      padding: 10px;
      cursor: pointer;
    }
  
    .dropdown-list li:hover {
      background-color: #ddd;
    }
    a{
        text-decoration: none;
        color: black;
    }
  </style>
  