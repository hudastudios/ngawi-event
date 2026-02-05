import { Request, Response } from 'express';
import * as eventService from './events.service';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const { search, month, category, page, limit, isFeatured, sortBy } = req.query;

        const result = await eventService.getAllEvents({
            search: search as string,
            month: month ? parseInt(month as string) : undefined,
            category: category as string,
            isFeatured: isFeatured === 'true',
            sortBy: sortBy as 'nearest' | 'newest',
            page: page ? parseInt(page as string) : 1,
            limit: limit ? parseInt(limit as string) : 8
        });

        res.json(result);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
};

export const getEvent = async (req: Request, res: Response) => {
    try {
        const event = await eventService.getEventBySlug(req.params.slug as string);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch event' });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    try {
        const event = await eventService.createEvent(req.body);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create event' });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const result = await eventService.deleteEvent(id);
        if (!result) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete event' });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id as string);
        const event = await eventService.updateEvent(id, req.body);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.json(event);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update event' });
    }
};
