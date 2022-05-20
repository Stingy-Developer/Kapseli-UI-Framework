import { KapseliProp } from "../types/Kapseli";

interface CommandProp {
  run: (args: any) => void;
  stop?: (args: any) => void;
}

interface CommandConfigProp {
  [key: string]: CommandProp;
}

export class Command {
  config: any;
  commands: CommandConfigProp;
  states: {
    [key: string]: boolean;
  };
  event: any;

  constructor(config: CommandConfigProp, self: KapseliProp) {
    this.config = config;
    this.commands = {};
    this.states = {};
    this.event = self.Event;

    for (const key in this.config) {
      if (Object.hasOwnProperty.call(this.config, key)) {
        this.add(key, this.config[key]);
      }
    }
  }
  add(command: string, config: CommandProp) {
    if (!this.has(command)) {
      this.commands[command] = {
        run: config.run,
        stop: config.stop !== undefined ? config.stop : () => {},
      };
      this.states[command] = false;
    }
  }
  has(command: string) {
    return command in this.commands ? true : false;
  }
  get(command: string) {
    if (this.has(command)) {
      return this.commands[command];
    }
    return false;
  }
  getAll() {
    return this.commands;
  }
  run(command: string, args: any) {
    if (this.has(command)) {
      this.states[command] = true;
      this.event.run(`run`, args);
      this.event.run(`run:${command}:before`, args);
      this.commands[command].run(args);
      this.event.run(`run:${command}:after`, args);

      if (!("stop" in this.commands[command])) {
        this.states[command] = false;
      }
    }
    return false;
  }
  stop(command: string, args: any) {
    if (this.has(command)) {
      if ("stop" in this.commands[command]) {
        this.event.run(`stop`, args);
        this.event.run(`stop:${command}:before`, args);
        this.commands[command].stop(args);
        this.event.run(`stop:${command}:after`, args);
        this.states[command] = false;
      }
    }
    return false;
  }
  isActive(command: string) {
    if (this.has(command)) {
      return this.states[command];
    }
    return false;
  }
  getActives() {
    let actives = [];
    for (const command in this.states) {
      if (Object.hasOwnProperty.call(this.states, command)) {
        const state = this.states[command];
        if (state) {
          actives.push(this.commands[command]);
        }
      }
    }
    return actives;
  }
}
