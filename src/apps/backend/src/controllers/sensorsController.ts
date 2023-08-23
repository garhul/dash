
import { Request, Response } from "express";
import HttpStatusCodes from "../utils/httpStatusCodes";
import { SensorsProvider } from "../providers";

import { getTaggedLogger } from "../services/logger";
const logger = getTaggedLogger('CONTROLLERS::Sensors');

export function getAll(_req: Request, res: Response) {
  res.status(HttpStatusCodes.OK).json(SensorsProvider.getAll());
}