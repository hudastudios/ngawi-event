import { Request, Response } from 'express';
import * as submissionService from './submissions.service';

export const getSubmissions = async (req: Request, res: Response) => {
    try {
        const submissions = await submissionService.getAllSubmissions();
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
};

export const getSubmissionById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const submission = await submissionService.getSubmissionById(id);
        if (!submission) {
            res.status(404).json({ error: 'Submission not found' });
            return;
        }
        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch submission' });
    }
};

export const createSubmission = async (req: Request, res: Response) => {
    try {
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        const posterFile = files?.['poster']?.[0];
        const galleryFiles = files?.['gallery'] || [];

        const galleryUrls = galleryFiles.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);

        const submissionData = {
            ...req.body,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            posterUrl: posterFile ? `${req.protocol}://${req.get('host')}/uploads/${posterFile.filename}` : null,
            galleryUrls: galleryUrls,
            dateRanges: (() => {
                const dr = req.body.dateRanges;
                console.log('Received dateRanges:', dr, 'Type:', typeof dr);
                if (!dr) return undefined;
                if (typeof dr === 'object') return dr; // Already parsed
                try {
                    return JSON.parse(dr);
                } catch (e) {
                    console.error('JSON Parse error for dateRanges:', dr);
                    throw new Error('Format tanggal tidak valid (Invalid JSON)');
                }
            })()
        };

        // Log the constructed data for verification
        // console.log('Submission Data:', submissionData);

        const submission = await submissionService.createSubmission(submissionData);
        res.status(201).json(submission);
    } catch (error) {
        console.error('Error creating submission:', error);
        res.status(500).json({ error: 'Failed to create submission', details: error instanceof Error ? error.message : String(error) });
    }
};

export const approveSubmission = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const result = await submissionService.approveSubmission(id);
        res.json(result);
    } catch (error) {
        console.error("Approve Submission Error:", error);
        res.status(500).json({
            error: 'Failed to approve submission',
            details: error instanceof Error ? error.message : String(error)
        });
    }
};

export const rejectSubmission = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const result = await submissionService.rejectSubmission(id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to reject submission' });
    }
};
