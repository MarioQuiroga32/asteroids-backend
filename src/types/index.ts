export interface Asteroid {
    links: {
        self: string;
    },
    id: string;
    neo_reference_id: string;
    name: string;
    name_limited: string;
    designation: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number,
    estimated_diameter: {
        kilometers: any;
        meters: any;
        miles: any;
        feet: any;
    },
    is_potentially_hazardous_asteroid: false,
    close_approach_data: any[],
    orbital_data: {
        orbit_id: string;
        orbit_determination_date: string;
        first_observation_date: string;
        last_observation_date: string;
        data_arc_in_days: 25367,
        observations_used: 1919,
        orbit_uncertainty: string;
        minimum_orbit_intersection: string;
        jupiter_tisserand_invariant: string;
        epoch_osculation: string;
        eccentricity: string;
        semi_major_axis: string;
        inclination: string;
        ascending_node_longitude: string;
        orbital_period: string;
        perihelion_distance: string;
        perihelion_argument: string;
        aphelion_distance: string;
        perihelion_time: string;
        mean_anomaly: string;
        mean_motion: string;
        equinox: string;
        orbit_class: any;
    },
    is_sentry_object: false
}