import { Injectable } from '@nestjs/common';
import TelegramBot, { Message } from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from 'src/config';

@Injectable()
export class BotService {
  private readonly bot: TelegramBot;

  constructor() {
    this.bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
  }

  setupHandlers() {
    this.bot.on('message', async (message: Message) => await this.onMessage(message));
  }
  
  async onMessage(message: Message) {
    
  }
}
