import {
  WebSocket,
  isWebSocketCloseEvent,
} from "https://deno.land/std/ws/mod.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const users = new Map<string, WebSocket>();

function broadcast(msg: string, senderID?: string) {
  if (!msg) return;
  for (const user of users.values())
    user.send(senderID ? `[${senderID}]: ${msg}` : msg);
}

export async function chat(ws: WebSocket) {
  const id = v4.generate();

  // Register user connection
  users.set(id, ws);
  broadcast(`> ${id} connected.`);

  // Wait for messages
  for await (const event of ws) {
    const message = typeof event === "string" ? event : "";

    broadcast(message, id);

    // Unregister connection
    if (!message && isWebSocketCloseEvent(event)) {
      users.delete(id);
      broadcast(`> ${id} disconnected.`);
      break;
    }
  }
}
