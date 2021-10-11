class Data {
  constructor(data) {
    this.data = data || {};
  }
  get(key) {
    if (key === undefined) {
      return this.data;
    }

    if (this.has(key)) {
      return this.data[key];
    }
    return false;
  }
  set(key, value = "") {
    if (key !== undefined) {
      this.data[key] = value;
    }
  }
  update(key, value = "") {
    if (this.has(key)) {
      this.set(key, value);
    }
  }
  delete(key) {
    if (this.has(key)) {
      delete this.data[key];
    }
  }
  has(key) {
    return key in this.data ? true : false;
  }
  dump() {
    return JSON.stringify(this.data);
  }
  load(data) {
    this.data = {
      ...this.data,
      ...JSON.parse(data),
    };
  }
}

export { Data };
