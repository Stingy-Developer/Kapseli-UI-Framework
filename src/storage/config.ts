import { Data } from "../data/index";
import { StorageConfig, StorageManagerConfig } from "../types/Storage";

const DefaultStorageProvider = (
  storage_name: "session" | "local"
): StorageConfig => {
  const storage = storage_name === "local" ? localStorage : sessionStorage;
  return {
    async store(data: any) {
      let d = new Data(data || {});

      let d_db = storage.getItem(this.options.storageKey);
      if (d_db) d.load(d_db);

      storage.setItem(this.options.storageKey, d.dump());

      return d.data;
    },

    async load(data: string[] | string) {
      let d = new Data({});

      let d_db = storage.getItem(this.options.storageKey);
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
  };
};

export const config: StorageManagerConfig = {
  storages: {
    session: DefaultStorageProvider("session"),
    local: DefaultStorageProvider("local"),
    remote: {
      async store(data: any) {
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

      async load(data: string | string[]) {
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
