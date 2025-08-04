const express = require("express");
const router = express.Router();
const casosController = require("../controllers/casosController");

/**
 * @swagger
 * /casos:
 *  get:
 *      summary: Lista de casos
 *      tags: [Casos]
 *      responses:
 *          200:
 *              description: Lista de casos
 *
 */
router.get("/", casosController.findAll);
/**
 * @swagger
 * /casos/{id}:
 *  get:
 *      summary: Busca por id do caso
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *      responses:
 *          200:
 *              description: Caso buscado por id com sucesso
 */
router.get("/:id", casosController.findById);
/**
 * @swagger
 * /casos:
 *  post:
 *      summary: Resgistro de casos
 *      tags: [Casos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [titulo, descricao, status, agente_id]
 *                      properties:
 *                          titulo:
 *                              type: string
 *                          descricao:
 *                              type: string
 *                          status:
 *                              enum: [aberto, solucionado]
 *                              type: string
 *                          agente_id:
 *                              type: string
 *      responses:
 *          201:
 *           description: Caso registrado com sucesso
 *
 */
router.post("/", casosController.create);
/**
 * @swagger
 * /casos/{id}:
 *  put:
 *      summary: Atualização de casos
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [titulo, descricao, status, agente_id]
 *                      properties:
 *                          titulo:
 *                              type: string
 *                          descricao:
 *                              type: string
 *                          status:
 *                              enum: [aberto, solucionado]
 *                              type: string
 *                          agente_id:
 *                              type: string
 *      responses:
 *          200:
 *           description: Casos atualizado com sucesso
 *
 */
router.put("/:id", casosController.update);
/**
 * @swagger
 * /casos/{id}:
 *  put:
 *      summary: Atualizar de casos
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required: [titulo, descricao, status, agente_id]
 *                      properties:
 *                          titulo:
 *                              type: string
 *                          descricao:
 *                              type: string
 *                          status:
 *                              enum: [aberto, solucionado]
 *                              type: string
 *                          agente_id:
 *                              type: string
 *      responses:
 *          200:
 *           description: Caso atualizado parcialmente com sucesso
 *
 */
router.patch("/:id", casosController.partialUpdate);
/**
 * @swagger
 * /casos/{id}:
 *  delete:
 *      summary: Deletar caso
 *      tags: [Casos]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: string
 *      responses:
 *          204:
 *           description: Casos Deletado com sucesso
 *
 */
router.delete("/:id", casosController.delete);

module.exports = router;
