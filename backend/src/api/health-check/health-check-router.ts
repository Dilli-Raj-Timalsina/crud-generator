import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Request, type Response, type Router } from "express";
import { z } from "zod";

import { ServiceResponse } from "@/common/models/service-response";
import { handleServiceResponse } from "@/common/utils/http-handler";
import { createApiResponse } from "@/api-docs/open-api-response-builders";

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
  method: "get",
  path: "/health-check",
  tags: ["Health Check"],
  responses: createApiResponse(z.null(), "Success"),
});

healthCheckRouter.get("/", (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success("Service is healthy", {
    message: "haha",
  });
  return handleServiceResponse(serviceResponse, res);
});
