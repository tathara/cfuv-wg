import { Injectable } from '@nestjs/common';
import TelegramBot, { CallbackQuery, Message, SendBasicOptions } from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from 'src/config';
import { User } from 'src/db/entities/user.entity';
import { Commands, CommandsText } from 'src/enums';
import { KeyService } from 'src/key/key.service';
import { UserService } from 'src/user/user.service';

interface IMessageData {
  chatId: number;
  text: string;
}

interface ICallbackData {
  chatId: number;
  callback: string;
}

@Injectable()
export class BotService {
  private readonly bot: TelegramBot;

  constructor(
    private readonly userService: UserService,
    private readonly keyService: KeyService,
  ) {
    this.bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
  }

  setupHandlers() {
    this.bot.on('message', async (message: Message) => await this.onMessage(message));
    this.bot.on(
      'callback_query',
      async (callbackQuery: CallbackQuery) => await this.onCallbackQuery(callbackQuery),
    );
  }

  private async onMessage(message: Message) {
    const { chatId, text } = this.getMessageData(message);

    let currentUser = await this.userService.getUser(chatId);

    if (!currentUser) currentUser = await this.userService.createUser(chatId);

    switch (text) {
      case Commands.START:
        return this.sendMainMenu(currentUser);

      case CommandsText.ADD:
        await this.addKeyToUser(currentUser);
        return this.sendMainMenu(currentUser);

      case CommandsText.DELETE:
        await this.deleteUsersKey(currentUser);
        return this.sendMainMenu(currentUser);

      default:
        return this.bot.deleteMessage(chatId, message.message_id);
    }
  }

  private async onCallbackQuery(callbackQuery: CallbackQuery) {
    try {
      const { chatId, callback } = this.getCallbackData(callbackQuery);

      const currentUser = await this.userService.getUser(chatId);

      const keyToDelete = await this.keyService.deleteKey(callback);

      return this.bot.sendMessage(currentUser.chatId, `❗️ Ключ ${keyToDelete} успешно удален!`);
    } catch (error) {
      console.error(error);
    }
  }

  private getMessageData(message: Message): IMessageData {
    const chatId = message.chat.id;
    const text = message.text;

    return {
      chatId,
      text,
    };
  }

  private getCallbackData(callbackQuery: CallbackQuery): ICallbackData {
    const chatId = callbackQuery.from.id;
    const callback = callbackQuery.data;

    return {
      chatId,
      callback,
    };
  }

  private sendMainMenu(user: User): Promise<Message> {
    const menuText = this.makeMenuText(user);
    const botOptions = this.makeBotOptions();

    return this.bot.sendMessage(user.chatId, menuText, botOptions);
  }

  private makeMenuText(user: User): string {
    let menuText = '🛠 Вы сейчас находитесь в главном меню!\n\n';

    if (!user.keys.length) {
      menuText += '❗️ Список ваших VPN ключей пуст';
      return menuText;
    }

    menuText += '❗️ Список ваших VPN ключей:\n';
    for (let i = 0; i < user.keys.length; i++) {
      menuText += `${i + 1}. ${user.keys[i].id}\n`;
    }

    return menuText;
  }

  private makeBotOptions(): SendBasicOptions {
    return {
      reply_markup: {
        keyboard: [[{ text: CommandsText.ADD }, { text: CommandsText.DELETE }]],
      },
    };
  }

  private async addKeyToUser(user: User): Promise<Message> {
    const createdKey = await this.keyService.createKey(user);

    await this.bot.sendMessage(
      user.chatId,
      '✅ Вот ваш конфигурационный файл для приложения WireGuard:',
    );
    await this.bot.sendDocument(user.chatId, createdKey.path);
    return this.sendMainMenu(user);
  }

  private async deleteUsersKey(user: User): Promise<any> {
    const keysOptions = this.makeKeysOptions(user);
    await this.bot.sendMessage(
      user.chatId,
      '⁉️ Выберите ключ, который необходимо удалить',
      keysOptions,
    );
  }

  private makeKeysOptions(user: User): SendBasicOptions {
    const keysButtons = user.keys.map((key) => [{ text: key.name, callback_query: key.name }]);
    return {
      reply_markup: {
        inline_keyboard: keysButtons,
      },
    };
  }
}
