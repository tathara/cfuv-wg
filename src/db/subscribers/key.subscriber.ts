import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Key } from '../entities/key.entity';
import { join } from 'path';

@EventSubscriber()
export class PeerSubscriber implements EntitySubscriberInterface<Key> {
  listenTo() {
    return Key;
  }

  async afterInsert(event: InsertEvent<Key>) {
    const key = event.entity;
    key.name = 'peer' + key.id;
    key.path = join(process.cwd(), 'configs', key.name, key.name);
    return event.manager.save(Key, key);
  }
}
