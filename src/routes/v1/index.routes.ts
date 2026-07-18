import { Router } from "express";
import healthRouter from "./health.routes"
import sampleRouter from "./sample.routes"

const v1Router = Router()

v1Router.use("/health", healthRouter)
v1Router.use("/sample",sampleRouter)

export default v1Router