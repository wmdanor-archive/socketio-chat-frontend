import { io, Socket } from 'socket.io-client';
import { config } from '../../config';
import {
  JoinRoomDataCS,
  JoinRoomDataSC,
  LeaveRoomDataCS,
  LeaveRoomDataSC,
  MessageDataCS,
  MessageDataSC,
  NewConnectionDataCS
} from './types';

export enum ServerToClientEventsEnum {
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  Message = 'message',
}

export enum ClientToServerEventsEnum {
  NewConnection = 'newConnection',
  JoinRoom = 'joinRoom',
  LeaveRoom = 'leaveRoom',
  Message = 'message',
}

export interface ServerToClientEvents {
  [ServerToClientEventsEnum.JoinRoom](data: JoinRoomDataSC): void;

  [ServerToClientEventsEnum.LeaveRoom](data: LeaveRoomDataSC): void;

  [ServerToClientEventsEnum.Message](data: MessageDataSC): void;
}

export interface ClientToServerEvents {
  [ClientToServerEventsEnum.NewConnection](data: NewConnectionDataCS): void;

  [ClientToServerEventsEnum.JoinRoom](data: JoinRoomDataCS): void;

  [ClientToServerEventsEnum.LeaveRoom](data: LeaveRoomDataCS): void;

  [ClientToServerEventsEnum.Message](data: MessageDataCS): void;
}

const data: {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
  isConnected: boolean;
} = {
  socket: null,
  isConnected: false,
};

export function getSocket(): Socket<ServerToClientEvents, ClientToServerEvents> {
  if (!data.socket) {
    data.socket = io(config.backendHost);
  }

  return data.socket;
}

export function setSocketConnectionStatus(value: boolean): void {
  data.isConnected = value;
}

export function getSocketConnectionStatus(): boolean {
  return data.isConnected;
}
