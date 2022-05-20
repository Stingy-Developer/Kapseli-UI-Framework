import { EventFunc, EventProp } from "../types/Event";

export class Event {
  event: EventProp;
  constructor(config: EventProp) {
    this.event = config || {};
  }
  register(name: string) {
    if (!(name in this.event)) {
      this.event[name] = [];
    }
  }
  run(name: string, args: any) {
    if (name in this.event) {
      this.event[name].forEach(function (e) {
        e(args);
      });
      return true;
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
      return false;
    }
  }
  on(name: string, cb: EventFunc) {
    if (name in this.event) {
      this.event[name].push(cb);
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
    }
  }
  get(name: string) {
    if (name in this.event) {
      return {
        name: name,
        listeners: this.event[name],
      };
    }
    return false;
  }
  getAll() {
    return this.event;
  }
  remove(name: string) {
    if (name in this.event) {
      delete this.event[name];
      return true;
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
      return false;
    }
  }
}
