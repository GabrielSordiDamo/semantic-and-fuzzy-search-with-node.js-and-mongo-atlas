/**
 * @swagger
 * components:
 *   schemas:
 *     SearchRequest:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 *           description: The search query.
 *           example: "example search"
 *         k:
 *           type: integer
 *           description: The number of results to return for semantic search.
 *           example: 5
 *         limit:
 *           type: integer
 *           description: The limit on the number of search results.
 *           example: 10
 *     FuzzySearchRequest:
 *       type: object
 *       properties:
 *         query:
 *           type: string
 *           description: The search query.
 *           example: "example fuzzy search"
 *         path:
 *           type: string
 *           description: The path to search.
 *           example: "text"
 *         maxEdits:
 *           type: integer
 *           description: Maximum edits for fuzzy search.
 *           example: 2
 *         prefixLength:
 *           type: integer
 *           description: Minimum prefix length.
 *           example: 1
 *         maxExpansions:
 *           type: integer
 *           description: Maximum expansions.
 *           example: 100
 *         limit:
 *           type: integer
 *           description: The limit on the number of search results.
 *           example: 10
 *         minScore:
 *           type: number
 *           description: Minimum score.
 *           example: 0.5
 */

export default {};
