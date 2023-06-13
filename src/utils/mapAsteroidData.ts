import { Asteroid } from "../types";

export const mapAsteroidData = (asteroid: Asteroid) => {
    return {
        id: asteroid.id,
        name: asteroid.name,
        diameter: {
            kilometers: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
            miles: asteroid.estimated_diameter.miles.estimated_diameter_max,
            meters: asteroid.estimated_diameter.meters.estimated_diameter_max
        },
        hazardous: asteroid.is_potentially_hazardous_asteroid,
        firstObservationDate: asteroid.orbital_data.first_observation_date,
        lastObservationDate: asteroid.orbital_data.last_observation_date,
    };
}