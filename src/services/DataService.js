import local from "./LocalAdapter";

class DataService {
  constructor() {
    this.adapter = local;
  }
  get(uri) {
    return this.adapter.get(uri);
  }

  post(uri, data) {
    return this.adapter.post(uri, data);
  }

  patch(uri, data) {
    return this.adapter.patch(uri, data);
  }

  put(uri, data) {
    return this.adapter.put(uri, data);
  }

  delete(uri) {
    return this.adapter.delete(uri);
  }
}

export default new DataService();
