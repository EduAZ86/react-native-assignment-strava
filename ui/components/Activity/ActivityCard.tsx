import { FC } from "react";
import { IActivityCardProps } from "./types";
import { Text, View } from "react-native";

export const ActivityCard: FC<IActivityCardProps> = ({ activity }) => {
    const date = new Date(activity.start_date);
    const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
    const time = Math.floor(activity.elapsed_time/60) + " min" + " : " + (activity.elapsed_time % 60) + " sec";
    const textDataClass = `text-light-text text-sm `
    return (
        <View className="flex flex-col justify-between items-center gap-2 bg-light-background shadow-md p-3 rounded-md w-full">
            <Text className="font-bold text-light-text text-xl">{activity.name}</Text>
            <Text className={textDataClass}>{formattedDate}</Text>
            <Text className={textDataClass}>{activity.sport_type}</Text>
            <View className="flex flex-row justify-between items-center w-full">
                <Text className={textDataClass}>Distance: {activity.distance} m</Text>
                <Text className={textDataClass}>Time: {time}</Text>
            </View>
            <View className="flex flex-row justify-between items-center w-full">
                <Text className={textDataClass}>Elevation Gain: {activity.total_elevation_gain} m</Text>
                <Text className={textDataClass}>Elevation high: {activity.elev_high} m</Text>

            </View>
        </View>
    )
}