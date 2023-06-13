export interface IChat {
  phone: string;
  id: number;
}

export interface IMessageResponse {
  idMessage: string;
}

export type IHistoryResponse = IChatHistory[];

export interface IChatHistory {
  type: string;
  idMessage: string;
  timestamp: number;
  typeMessage: string;
  chatId: string;
  textMessage: string;
  extendedTextMessage: ExtendedTextMessage;
  statusMessage: string;
  sendByApi: boolean;
}

export interface ExtendedTextMessage {
  text: string;
  description: string;
  title: string;
  previewType: string;
  jpegThumbnail: string;
  forwardingScore: any;
  isForwarded: any;
}

export interface IMessageParams {
  message: string;
  phoneNumber: string | undefined;
}