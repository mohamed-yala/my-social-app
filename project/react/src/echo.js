import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from 'axios';
window.axios = axios;

window.axios.defaults.withCredentials = true;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Pusher = Pusher;

const echo = new Echo({
    broadcaster: "reverb",
    key: import.meta.env.VITE_REVERB_APP_KEY,   // same as in Laravel
    wsHost: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "https") === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: "http://localhost:8000/broadcasting/auth",  // Laravel URL
   
      authorizer: (channel, options) => {
    return {
        authorize: (socketId, callback) => {
            const token = sessionStorage.getItem("ACCESS_TOKEN"); // dynamic read
            axios.post('http://localhost:8000/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => callback(false, response.data))
            .catch(error => callback(true, error));
        }
    };
}

});

export default echo;
