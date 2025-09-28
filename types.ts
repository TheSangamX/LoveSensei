export type Language = 'english' | 'hinglish';

export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
}

export type Avatar = {
  type: 'emoji' | 'url';
  value: string;
};

export interface BackgroundTheme {
  name: string;
  className: string;
}

export interface ChatBackgroundTheme {
  name: string;
  className: string;
}