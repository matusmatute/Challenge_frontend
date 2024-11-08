// src/socket.js
import { io } from "socket.io-client";

// Cambia la URL para que coincida con tu servidor
 export const socket = io("http://localhost:5000");

export default socket;
