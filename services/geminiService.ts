
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION, HINGLISH_SYSTEM_INSTRUCTION } from '../constants';
import { Language } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export function startLoveSenseiChat(language: Language): Chat {
  const systemInstruction = language === 'english' ? SYSTEM_INSTRUCTION : HINGLISH_SYSTEM_INSTRUCTION;
  
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: systemInstruction,
    },
  });
}