export class Data {
  data: any;
  constructor(data: any) {
    this.data = data || {};
  }
  get(key: string) {
    if (key === undefined) {
      return this.data;
    }

    if (this.has(key)) {
      return this.data[key];
    }
    return false;
  }
  set(key: string, value: any) {
    this.data[key] = value;
  }
  update(key: string, value: any) {
    if (this.has(key)) {
      this.set(key, value);
    }
  }
  delete(key: string) {
    if (this.has(key)) {
      delete this.data[key];
    }
  }
  has(key: string) {
    return key in this.data ? true : false;
  }
  dump() {
    return JSON.stringify(this.data);
  }
  load(data: any) {
    this.data = {
      ...this.data,
      ...JSON.parse(data),
    };
  }
}
