const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");
var audio =new  Audio('ping.mp3');
const el =document.querySelector(".container");

// message apend funtion
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position=='left'){
        audio.play();
    }
    if(el){
        el.scrollTop=el.scrollHeight;
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`you:\n${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
    // if(el){
    //     el.scrollTop=el.scrollHeight;
    // }

})

let name=prompt("Enter you name to join the chat");
while (name==null || name.length==0){
    name=prompt("Enter you name to join the chat");
}

// socket conections 
socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
append(`${name} joined the chat`,'middle');

})


socket.on('receive',data=>{
    append(`${data.name}:\n${data.message}`,'left');
    // if(el){
    //     el.scrollTop=el.scrollHeight
    // }
    
    })

socket.on('left',name=>{
        append(`${name} left the chat`,'left');
        
    })

