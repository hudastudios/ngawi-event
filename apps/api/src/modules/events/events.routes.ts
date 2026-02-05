import { Router } from 'express';
import * as eventController from './events.controller';

const router = Router();

router.get('/', eventController.getEvents);
router.get('/:slug', eventController.getEvent);
router.post('/', eventController.createEvent);
router.delete('/:id', eventController.deleteEvent);
router.patch('/:id', eventController.updateEvent);

export default router;
