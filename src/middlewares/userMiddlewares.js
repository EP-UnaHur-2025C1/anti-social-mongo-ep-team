const User = require("../db/models/user")
const { validateUniqueAttribute } = require('../utils/entityValidation');

/**
 * Middleware para verificar que un atributo de usuario es único
 * @param {string} attribute - Atributo a verificar (ej: 'email', 'username')
 * @returns {Function} - Middleware function
 */
const existUserByAttribute = (attribute) => {
    return validateUniqueAttribute(User, attribute, 'usuario', 'id');
}

/**
 * Middleware para verificar que un usuario existe por ID
 * @returns {Function} - Middleware function
 */
const existUserModelById = () => {
    return async (req, res, next) => {
        const userId = req.body.userId;
        if (userId) {
            const data = await User.findById(userId);
            if (!data) {
                return res
                    .status(404)
                    .json({ error: `El usuario con ID ${userId} no se encuentra registrado` });
            }
        }
        next();
    };
}

module.exports = { existUserByAttribute, existUserModelById }