import { NextFunction, Request, Response } from "express";

export class BatchesController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({ message: 'Batch created' })
  }

  get = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Batch retrieved' })
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Batches listed' })
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Batch updated' })
  }

  patch = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Batch patched' })
  }

  remove = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Batch deleted' })
  }
}
