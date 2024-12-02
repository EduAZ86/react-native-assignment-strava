import { FC } from "react";
import { IstatisticDataProps } from "./types";
import { Text, View } from "react-native";

export const StatisticsData: FC<IstatisticDataProps> = ({
    label,
    value
}) => {
    const textClass = `text-light-text text-xl font-bold `
    return (
        <View className="flex flex-row justify-between items-center shadow-md p-3 rounded-md w-full">
            <Text className={textClass}>{label}</Text>
            <Text className={textClass}>{value}</Text>
        </View>
    )
}