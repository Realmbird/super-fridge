import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { SubmissionController } from '@/controllers/submission.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { SubmitDto } from '@/dtos/submission.dto'; //input loook into more

export class FridgeRoute implements Routes {
  public router = Router();
  public submission = new SubmissionController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`/submitFridge`, ValidationMiddleware(SubmitDto), this.submission.uploadReciept);
  }
}
