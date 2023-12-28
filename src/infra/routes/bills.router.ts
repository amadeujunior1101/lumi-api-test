// routes/billsRouter.ts
import express, { Request, Response } from "express";
import { billController } from "../containers/bill.container";

const billsRouter = express.Router();

// percorre as rotas e coloca o interceptor
// billsRouter.use((req, res, next) => {
//   const method = req.method;
//   const idPattern = /\/\d+$/;
//   if (method === "GET" && idPattern.test(req.path)) {
//     return next();
//   }
//   if (method === "POST" && req.path === "/") {
//     return next();
//   }
//   return authenticateJWT(req, res, next);
// });

billsRouter.get("/", async (req: Request, res: Response) => {
  return billController.listBills(req, res);
});

billsRouter.get("/clients", async (req: Request, res: Response) => {
  return billController.listClients(req, res);
});

billsRouter.get("/:client_code", async (req: Request, res: Response) => {
  return billController.listByClientCode(req, res);
});

billsRouter.get("/id/:id", async (req: Request, res: Response) => {
  return billController.listOne(req, res);
});

export { billsRouter };
