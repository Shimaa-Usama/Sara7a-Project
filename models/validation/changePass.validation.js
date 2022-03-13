const { check } = require('express-validator')
module.exports = [check('newPass').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
                    check('reNewPass').custom((value, { req }) => {
                        if (value !== req.body.newPass) {
                            return false;

                        }

                        return true;
                    })
]