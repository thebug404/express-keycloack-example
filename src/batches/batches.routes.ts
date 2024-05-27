import { Router } from 'express'

import { keycloack } from '../config/keycloack'

import { extractPermissions } from '../middlewares/extractPermissions'
import { hasPermissions } from '../middlewares/hasPermissions'

import { BatchesController } from './batches.controller'

const controller = new BatchesController()

const router = Router({})

// Create a new batch
router.post(
  '/',
  [
    keycloack.protect(),
    extractPermissions(),
    hasPermissions(['batches:create'])
  ],
  controller.create
)

// Get a batch
router.get(
  '/:id',
  [
    keycloack.protect(),
    extractPermissions(),
    hasPermissions(['batches:read'])
  ],
  controller.get
)

// List all batches
router.get(
  '/',
  [
    keycloack.protect(),
    extractPermissions(),
    hasPermissions(['batches:read'])
  ],
  controller.list
)

// Update a batch
router.put(
  '/:id',
  [
    keycloack.protect(),
    extractPermissions(),
    hasPermissions(['batches:update'])
  ],
  controller.update
)

// Patch a batch
router.patch(
  '/:id',
  [
    keycloack.protect(),
    extractPermissions(),
    hasPermissions(['batches:update'])
  ],
  controller.patch
)

// Delete a batch
router.delete(
  '/:id',
  [
    keycloack.protect(),
    extractPermissions(),
    hasPermissions(['batches:remove'])
  ],
  controller.remove
)

export default router
