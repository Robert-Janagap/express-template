const { validationResult } = require("express-validator");
const { FieldsError } = require("../../../../lib/exception");
/**
 *  @desc     Find all images
 *  @author   Robert Janagap
 *  @since    Dec. 27, 2022
 *  @api      /image
 *  @method   GET
 **/
exports.findAllImage = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new FieldsError({
        errors: errors.array().map(({ msg, param, location }) => ({
          message: msg,
          path: param,
          location,
        })),
      });
    }
  } catch (error) {
    next(error);
  }
};
