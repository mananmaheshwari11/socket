const videoGrid = document.getElementById('videoGrid');
const toggleAudioButton = document.getElementById('toggleAudio');
const toggleVideoButton = document.getElementById('toggleVideo');
const leaveButton = document.getElementById('leaveButton');

let localStream;
let peers = {}; // Store WebRTC peer connections
let isAudioEnabled = true;
let isVideoEnabled = true;

// Initialize WebRTC on page load
async function initWebRTC() {
  // Access audio and video from the user
  localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  addVideoTile(localStream, 'local');

  // Handle adding remote participants
  setupWebRTCConnections();
}

// Add video tile to the grid
function addVideoTile(stream, id) {
  const videoTile = document.createElement('div');
  videoTile.classList.add('tile');
  videoTile.id = `tile-${id}`;

  const video = document.createElement('video');
  video.srcObject = stream;
  video.autoplay = true;
  video.playsInline = true;

  // Mute local video to avoid feedback
  if (id === 'local') {
    video.muted = true;
  }

  videoTile.appendChild(video);
  videoGrid.appendChild(videoTile);

  adjustGridLayout();
}

// Remove video tile
function removeVideoTile(id) {
  const tile = document.getElementById(`tile-${id}`);
  if (tile) {
    tile.remove();
  }
  adjustGridLayout();
}

// Dynamically adjust grid layout
function adjustGridLayout() {
  const tiles = document.querySelectorAll('.tile');
  const numTiles = tiles.length;
  const gridSize = Math.min(numTiles, 9);

  videoGrid.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(gridSize))}, 1fr)`;
  videoGrid.style.gridAutoRows = `minmax(200px, 1fr)`;
}

// Toggle audio on/off
toggleAudioButton.addEventListener('click', () => {
  
  isAudioEnabled = !isAudioEnabled;
  localStream.getAudioTracks()[0].enabled = isAudioEnabled;
  toggleAudioButton.textContent = isAudioEnabled ? 'Mute Audio' : 'Unmute Audio';
});

// Toggle video on/off
toggleVideoButton.addEventListener('click', () => {
  isVideoEnabled = !isVideoEnabled;
  localStream.getVideoTracks()[0].enabled = isVideoEnabled;
  toggleVideoButton.textContent = isVideoEnabled ? 'Turn Off Video' : 'Turn On Video';
});

// Leave meeting
leaveButton.addEventListener('click', () => {
  for (let peerId in peers) {
    peers[peerId].close();
  }
  videoGrid.innerHTML = '';
  localStream.getTracks().forEach(track => track.stop());
  alert('You have left the meeting.');
});

// Setup WebRTC connections for all participants (simplified)
function setupWebRTCConnections() {
  // Assume signaling is done and we have peer connections
  // In practice, signaling should be set up using WebSocket or other methods
  // Add peers and listen for stream events

  // Example: Adding a new participant
  addParticipant('peer-1');
}

// Add a new participant's video tile
function addParticipant(peerId) {
  // Create a new RTCPeerConnection for the participant
  const peerConnection = new RTCPeerConnection();
  peers[peerId] = peerConnection;

  // Add local stream tracks to the connection
  localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
  });

  // Listen for remote streams
  peerConnection.ontrack = event => {
    const [stream] = event.streams;
    addVideoTile(stream, peerId);
  };

  // Placeholder for signaling: exchange offer/answer here
}

// Start WebRTC on page load
window.addEventListener('load', initWebRTC);
