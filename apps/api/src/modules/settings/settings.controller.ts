import { Request, Response } from 'express';
import * as settingsService from './settings.service';

export const getHomeBanner = async (req: Request, res: Response) => {
    try {
        const bannerUrl = await settingsService.getSetting('home_banner');
        res.json({ bannerUrl });
    } catch (error) {
        console.error('Error fetching home banner:', error);
        res.status(500).json({ error: 'Failed to fetch home banner', details: error instanceof Error ? error.message : String(error) });
    }
};

export const uploadHomeBanner = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const bannerUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        await settingsService.updateSetting('home_banner', bannerUrl);

        res.json({ bannerUrl });
    } catch (error) {
        console.error('Error uploading home banner:', error);
        res.status(500).json({ error: 'Failed to upload home banner' });
    }
};
