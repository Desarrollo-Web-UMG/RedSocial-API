//Importar modulos
const jwt = require("jwt-simple");
const moment = require("moment");

//Importar clave secreta
const libjwt = require("../services/jwt");
const claveSecreta = libjwt.claveSecreta;

// Definir lista negra de tokens en memoria
const revokedTokens = [];

//Middleware de autenticación
exports.auth = (req, res, next) => {
    // Comprobar si la cabecera de autenticación está presente
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: "La petición no tiene la cabecera de autenticación"
        });
    }

    // Obtener el token y remover comillas
    let token = req.headers.authorization.replace(/['"]+/g, '');

    // Verificar si el token está en la lista negra
    if (revokedTokens.includes(token)) {
        return res.status(401).send({
            status: "error",
            message: "Token revocado, inicie sesión de nuevo"
        });
    }

    try {
        // Decodificar el token
        let payload = jwt.decode(token, claveSecreta);

        // Comprobar expiración del token
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: "error",
                message: "Token expirado"
            });
        }

        // Agregar datos de usuario a la request
        req.user = payload;
    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "Token inválido",
            error: error.message
        });
    }

    // Pasar a la siguiente función si todo está bien
    next();
}

// Exportar la lista negra para uso en otras partes del código
exports.revokedTokens = revokedTokens;