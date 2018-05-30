import { config } from "../../../../config";
import io from 'socket.io-client';

const conn = new WebSocket(`ws://${config.apiHost}:${config.apiPort}`)

