export default class Errors {
  constructor(errors = {}) {
    this.errors = typeof errors === "object" && errors !== null ? errors : {};
  }

  set(errors) {
    this.errors = errors;
  }

  get(field) {
    return this.errors[field] || null;
  }

  has(field) {
    return Object.prototype.hasOwnProperty.call(this.errors, field);
  }

  clear() {
    this.errors = {};
  }
}
