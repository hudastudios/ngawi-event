import { Router } from 'express';
import * as submissionController from './submissions.controller';

import { upload } from '../../config/multer';

const router = Router();

router.get('/', submissionController.getSubmissions);
router.get('/:id', submissionController.getSubmissionById);
const uploadMiddleware = (req: any, res: any, next: any) => {
    const uploadFields = upload.fields([
        { name: 'poster', maxCount: 1 },
        { name: 'gallery', maxCount: 5 }
    ]);

    uploadFields(req, res, (err: any) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ error: 'Ukuran file terlalu besar. Maksimal 5MB.' });
            }
            if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                return res.status(400).json({ error: 'Terlalu banyak file atau field tidak sesuai.' });
            }
            return res.status(400).json({ error: err.message || 'Gagal mengupload file.' });
        }
        next();
    });
};

router.post('/', uploadMiddleware, submissionController.createSubmission);
router.post('/:id/approve', submissionController.approveSubmission);
router.post('/:id/reject', submissionController.rejectSubmission);

export default router;
