
export interface IActivity {
    id: number;
    name: string;
    distance: number;
    moving_time: number;
    elapsed_time: number;
    total_elevation_gain: number;
    type: string;
    activity_type: number;
    start_date: string;
    start_date_local: string;
    timezone: string;
}