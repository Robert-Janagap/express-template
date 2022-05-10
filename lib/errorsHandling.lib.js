module.exports = ({ errors = [], message = "Error", status = 0 }) => {
    /**http status */
    status = {
      code: status,
      message: "",
    };
    switch (status.code) {
      case 400:
        status.message = "Bad Request";
        break;
      case 401:
        status.message = "Unauthorized";
        break;
      case 404:
        status.message = "Not Found";
        break;
      case 500:
        status.message = "Internal Server Error";
        break;
      default:
        status.message = "";
    }
  
    return {
      errors,
      message,
      status,
    };
  };
  