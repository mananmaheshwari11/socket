import io from 'socket.io-client'


export function connectSocket(joinCode,userID,name){
        const socket=io('http://localhost:8080');
        socket.emit('join-meet',{joinCode:joinCode,userID:userID,name:name});
        
}

export function checkMeeting() {
        if (localStorage.getItem("joinCode")) {
          alert("An active meeting is already in progress. Please end it before starting a new one.");
          return false;
        }
        return true;
}

export function setMeeting(joinCode){
        if(checkMeeting()){
        localStorage.setItem("joinCode",JSON.stringify(joinCode));
        }
}

export function getMeeting(){
        const code=localStorage.getItem("joinCode");
        const joinCode=JSON.parse(code);
        return joinCode;
}