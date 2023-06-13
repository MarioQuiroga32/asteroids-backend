import { mapAsteroidData } from '../src/utils/mapAsteroidData';
import { asteroidMock } from './mocks/asteroid';
import { Asteroid } from "../src/types";

describe('mapAsteroidData', () => {
    it('Should map asteroid data', () => {
        const mappedAsteroid = mapAsteroidData(asteroidMock as Asteroid);
        expect(mappedAsteroid).toEqual({
            id: 'id',
            name: 'name',
            diameter: {
                kilometers: 0,
                miles: 0,
                meters: 0
            },
            hazardous: false,
            firstObservationDate: 'first_observation_date',
            lastObservationDate: 'last_observation_date',
        })
    })
});