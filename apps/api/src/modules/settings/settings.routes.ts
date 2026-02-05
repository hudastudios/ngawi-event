import { Router } from 'express';
import * as settingsController from './settings.controller';
import { upload } from '../../config/multer';

const router = Router();

router.get('/home-banner', settingsController.getHomeBanner);
router.post('/home-banner', upload.single('banner'), settingsController.uploadHomeBanner);

export default router;
