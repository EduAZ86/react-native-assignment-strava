import { FC } from "react";
import { IActivityCardProps } from "./types";
import { Text, View } from "react-native";

export const ActivityCard: FC<IActivityCardProps> = ({ activity }) => {
    return (
        <View className="flex flex-col justify-between items-center bg-light-background shadow-md p-3 rounded-md w-full">
            <Text className="font-bold text-light-text text-xl">{activity.name}</Text>
            <View className="flex flex-row justify-between items-center w-full">
                <Text className="text-lg text-light-text">Distance: {activity.distance}</Text>
                <Text className="text-lg text-light-text">Time: {activity.time}</Text>
            </View>
            <View className="flex flex-row justify-between items-center w-full">
                <Text className="text-lg text-light-text">Elevation Gain: {activity.elevation_gain}</Text>
                <Text className="text-lg text-light-text">Date: {activity.date}</Text>
            </View>
        </View>
    )
}