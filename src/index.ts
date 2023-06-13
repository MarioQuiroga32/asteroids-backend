import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import { initMongoDB } from "./utils/initMongoDB";
import { mapAsteroidData } from "./utils/mapAsteroidData";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT;

const api_key = process.env.NASA_API_KEY;
const nasaBaseUrl = 'https://api.nasa.gov/neo/rest/v1/neo';

const mongoURI = process.env.MONGODB_URI;
const client = new MongoClient(mongoURI as string);
initMongoDB(client);

app.get('/asteroids', async (req: Request, res: Response) => {
    try {
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;

        let url = `${nasaBaseUrl}/browse`;
        const params: any = {
            api_key,
        };

        if (startDate && endDate) {
            url = `https://api.nasa.gov/neo/rest/v1/feed`;
            params.start_date = startDate;
            params.end_date = endDate;
        }

        const response = await axios.get(url, { params });

        if (startDate && endDate) {
            const asteroids = Object.values(response.data.near_earth_objects).flat().map(mapAsteroidData as any);
            res.json(asteroids);
            return;
        }

        const asteroids = response.data.near_earth_objects?.map(mapAsteroidData) || Object.values(response.data.near_earth_objects);

        res.json(asteroids);
    } catch (error) {
        console.error('Error fetching asteroids:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.post('/asteroids/favorites/:id', async (req: Request, res: Response) => {
    try {
        const asteroidId = req.params.id;
        const payload = req.body;

        const db = client.db('asteroid-db');
        const favoritesCollection = db.collection('favorites');

        const existingFavorite = await favoritesCollection.findOne({ asteroidId });

        if (existingFavorite) {
            await favoritesCollection.deleteOne({ asteroidId });
            res.json({ message: 'Asteroid removed from favorites' });
        } else {
            const favoriteAsteroid = {
                _id: new ObjectId(),
                asteroidId,
                createdAt: new Date(),
                ...payload
            };

            await favoritesCollection.insertOne(favoriteAsteroid);
            res.json({ message: 'Asteroid marked as favorite' });
        }
    } catch (error) {
        console.error('Error marking asteroid as favorite:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


app.get('/asteroids/details/:id', async (req: Request, res: Response) => {
    try {
        const asteroidId = req.params.id;

        const response = await axios.get(`${nasaBaseUrl}/${asteroidId}`, {
            params: {
                api_key,
            },
        });

        const asteroid = {
            ...mapAsteroidData(response.data),
            ...response.data.orbital_data,
        };

        res.json(asteroid);
    } catch (error) {
        console.error('Error fetching asteroid:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.get('/asteroids/favorites', async (req: Request, res: Response) => {
    try {
        const db = client.db('asteroid-db');
        const favoritesCollection = db.collection('favorites');

        const favoriteAsteroids = await favoritesCollection.find().toArray();

        const asteroidIds = favoriteAsteroids.map((favorite) => favorite.asteroidId);

        const asteroidPromises = asteroidIds.map((id) => {
            return axios.get(nasaBaseUrl +  '/' + id, {
                params: {
                    api_key,
                },
            });
        });

        const asteroidResponses = await Promise.all(asteroidPromises);

        const favoriteAsteroidsData = asteroidResponses.map((response) => mapAsteroidData(response.data));

        res.json(favoriteAsteroidsData);
    } catch (error) {
        console.error('Error fetching favorite asteroids:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
