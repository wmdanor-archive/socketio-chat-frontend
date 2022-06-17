import { io, Socket } from 'socket.io-client';
import { config } from '../../config';
import * as CST from './types/client-to-server';

export enum ServerToClientEventsEnum {
  JoinRoom = 'joinRoom',
  Message = 'message',
}

export enum ClientToServerEventsEnum {
  NewConnection = 'newConnection',
  JoinRoom = 'joinRoom',
  Message = 'message',
}

export interface ServerToClientEvents {
  [ServerToClientEventsEnum.JoinRoom](data: any): void;

  [ServerToClientEventsEnum.Message](data: any): void;
}

export interface ClientToServerEvents {
  [ClientToServerEventsEnum.NewConnection](data: CST.NewConnectionData): void;

  [ClientToServerEventsEnum.JoinRoom](data: CST.JoinRoomData): void;

  [ClientToServerEventsEnum.Message](data: CST.MessageData): void;
}

const data: {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
} = {
  socket: null,
};

export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  if (!data.socket) {
    data.socket = io(config.backendHost);
  }

  return data.socket;
}
