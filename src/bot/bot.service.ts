import { Injectable } from '@nestjs/common';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from 'src/config';
import { Commands } from 'src/enums';

interface IMessageData {
  chatId: number;
  username: string;
  text: string;
}

@Injectable()
export class BotService {
  private readonly bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
  }

  setupHandlers() {
    this.bot.on('message', async (message: Message) => await this.onMessage(message));
  }

  private async onMessage(message: Message) {
    const { chatId, username, text } = this.getMessageData(message);

    switch(text) {
      case Commands.START:
        
    }
  }

  private getMessageData(message: Message): IMessageData {
    const chatId = message.chat.id;
    const username = message.from.first_name;
    const text = message.text;

    return {
      chatId,
      username,
      text,
    };
  }
}
