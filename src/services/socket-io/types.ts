export interface NewConnectionDataCS {
  username: string;
}

export interface JoinRoomDataCS {
  name: string;
}

export interface JoinRoomDataSC {
  username: string;
  roomUsers: string[];
}

export type LeaveRoomDataCS = never;

export interface LeaveRoomDataSC {
  username: string;
  roomUsers: string[];
}

export interface MessageDataCS {
  message: string;
}

export interface MessageDataSC {
  username: string;
  message: string
}
