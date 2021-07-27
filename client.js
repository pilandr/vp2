

import MegaChat from './megachat.js';




new MegaChat();


/*
let ws;
let clientId = null;

const btn = document.getElementById('loginButton');

btn.addEventListener('click', function (event) {
    //event.preventDefault();
    ws = new WebSocket('ws://localhost:5501');
   
    ws.onmessage = function (message) {
        console.log(message.data);
        const response = JSON.parse(message.data);
        switch (response.type) {
            case 'LOGIN_RESPONSE':
                clientId = response.payload.clientId;
                console.log(response.payload.clientId);
                break;
            default:
                console.log('Unknown Response');
                break;
    
        }
    }

    ws.onopen = function () {
        // console.log('Client Connected');
        const chat = document.querySelector(".chat");
        const start_page = document.querySelector(".start_page");
        chat.classList.remove("hidden");
        start_page.classList.add("hidden");
    
    }
   
    const nick = document.querySelector(".autorization__input");
    console.log(nick.value);
    const request = {
        type: 'LOGIN',
        payload: {
            login: '4t4t4',
            password: '123123',
        }
    }
    ws.send(JSON.stringify(request));
})
*/

//
// btnLogout.addEventListener('click', function (event) {
//     event.preventDefault();
//     const request = {
//         type: 'LOGOUT',
//         payload: {
//             userName: 'fdsfds',
//             clientId: clientId
//         }
//     }

//     console.log(JSON.stringify(request));

//     ws.send(JSON.stringify(request));

// })


