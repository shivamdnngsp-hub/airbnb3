import { body } from "express-validator"

export const bookingValidator = [

  body("startDate")
    .notEmpty().withMessage("Start date required"),
  body("endDate")
    .notEmpty().withMessage("Start date required"),

  body("guests.adults")
    .isInt({ min: 1 })
    .withMessage("At least one adult required"),

  body("guests.children")
    .optional()
    .isInt({ min: 0 }),

  body("guests.infants")
    .optional()
    .isInt({ min: 0 }),
]