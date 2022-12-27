module.exports = class FieldsError extends Error {
  constructor({ message = "Invalid Fields", errors }) {
    super(message);
    this.errors = errors;
  }
};
