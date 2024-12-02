export interface IStatistics {
    recent_run_totals: string;
    all_run_totals: string;
    recent_swim_totals: string;
    biggest_ride_distance: number;
    ytd_swim_totals: string;
    all_swim_totals: string;
    recent_ride_totals: RecentRideTotals;
    biggest_climb_elevation_gain: number;
    ytd_ride_totals: string;
    all_ride_totals: string;
    ytd_run_totals: string;
}

interface RecentRideTotals {
    distance: number;
    achievement_count: number;
    count: number;
    elapsed_time: number;
    elevation_gain: number;
    moving_time: number;
}






