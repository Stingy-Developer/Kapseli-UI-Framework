import { Data } from "../data/index";

let config = {
  storages: {
    session: {
      async store(data) {
        let d = new Data(data || {});

        let d_db = sessionStorage.getItem(this.options.storageKey);
        if (d_db) d.load(d_db);

        sessionStorage.setItem(this.options.storageKey, d.dump());

        return d.data;
      },

      async load(data) {
        let d = new Data({});

        let d_db = sessionStorage.getItem(this.options.storageKey);
        if (d_db) d.load(d_db);

        let data_arr = Array.from(data);
        let query = {};
        for (let i = 0; i < data_arr.length; i++) {
          if (d.has(data_arr[i])) {
            query[data_arr[i]] = d.get(data_arr[i]);
          }
        }

        return query;
      },

      options: {
        storageKey: "kapseli-storage",
      },
    },
    local: {
      async store(data) {
        let d = new Data(data || {});

        let d_db = localStorage.getItem(this.options.storageKey);
        if (d_db) d.load(d_db);

        localStorage.setItem(this.options.storageKey, d.dump());

        return d.data;
      },

      async load(data) {
        let d = new Data({});

        let d_db = localStorage.getItem(this.options.storageKey);
        if (d_db) d.load(d_db);

        let data_arr = Array.from(data);
        let query = {};
        for (let i = 0; i < data_arr.length; i++) {
          if (d.has(data_arr[i])) {
            query[data_arr[i]] = d.get(data_arr[i]);
          }
        }

        return query;
      },

      options: {
        storageKey: "kapseli-storage",
      },
    },
    remote: {
      async store(data) {
        let d = new Data(data || {});

        await fetch(this.options.store_url, {
          method: "POST",
          body: d.dump(),
          headers: {
            "Content-Type": "application/json",
            ...this.options.headers,
          },
        })
          .then((res) => {
            d.data = {};
            d.load(res);
          })
          .catch((e) => {
            throw e;
          });

        return d.data;
      },

      async load(data) {
        let d = new Data({});

        await fetch(this.options.load_url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...this.options.headers,
          },
        })
          .then((res) => {
            d.load(res);
          })
          .catch((e) => {
            throw e;
          });

        let data_arr = Array.from(data);
        let query = {};
        for (let i = 0; i < data_arr.length; i++) {
          if (d.has(data_arr[i])) {
            query[data_arr[i]] = d.get(data_arr[i]);
          }
        }

        return query;
      },

      options: {
        storageKey: "kapseli-storage",
        store_url: "localhost/post",
        load_url: "localhost/get",
        headers: {},
      },
    },
  },
  currentStorage: "local",
};

export { config };
