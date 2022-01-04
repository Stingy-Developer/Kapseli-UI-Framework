export class Event {
  constructor(config) {
    this.event = config || {};
  }
  register(name) {
    if (!(name in this.event)) {
      this.event[name] = [];
    }
  }
  run(name, args) {
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
  on(name, cb) {
    if (name in this.event) {
      this.event[name].push(cb);
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
    }
  }
  get(name) {
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
  remove(name) {
    if (name in this.event) {
      delete this.event[name];
      return true;
    } else {
      console.log(`EventError: '${name}' Event is not found!`);
      return false;
    }
  }
}
