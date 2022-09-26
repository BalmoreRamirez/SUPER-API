const {Router} = require('express');
const {check} = require('express-validator');

const {validarJWT, validarCampos, esAdminRole} = require('../middlewares');

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categorias');

const {existeCategoriaPorId} = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categories

/**
 * get all categories is public
 */
router.get('/', getCategories);

/**
 * get category with ID - is public
 */
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], getCategory);

/**
 * Create category - is private - anyone with a token
 */
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], createCategory);

/**
 * update - is private - anyone with a token
 */
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], updateCategory);

/**
 * delete - anyone with rol ADMIN
 */
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No ID valid in MONGO').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
], deleteCategory);


module.exports = router;