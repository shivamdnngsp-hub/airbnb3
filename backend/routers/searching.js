import express from "express"
import { searching } from "../controllers/searchingController.js"
const searchingRouter = express.Router()
searchingRouter.get("/input", searching)
export default searchingRouter