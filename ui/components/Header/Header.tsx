import { FC } from "react";
import { IHeaderProps } from "./types";
import { Image, Text, View } from "react-native";
import { usePathname } from "expo-router";

export const Header: FC<IHeaderProps> = ({ userName, image }) => {
    const path = usePathname()
    
    const screenName = path
        .split('/')
        .filter(Boolean)
        .pop() 
        ?.replace(/-/g, ' ') 
        .replace(/\b\w/g, char => char.toUpperCase()) || '';
    
    return (
        <View
            className="relative flex flex-row justify-between items-center bg-light-primary drop-shadow-lg px-2 w-full h-10"
        >
            <Text className="font-bold text-lg text-light-secondary" >{screenName}</Text>
            <View className="flex flex-row items-center gap-2">
                <Text className="font-medium text-light-secondary">{userName}</Text>
                <Image className="shadow-lg rounded-full w-8 h-8" source={{ uri: image }} />
            </View>
        </View>
    )
}