import { } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useLocalSearchParams, } from 'expo-router';

interface IFakeActivity {
    name: string;
    distance: string;
    time: string;
}

export default function ActivitiesScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Simulando datos de actividades
    const activityDetails: IFakeActivity[] = [

        { name: 'Running in the Park', distance: '5 km', time: '25 min' },
        { name: 'Cycling by the Beach', distance: '15 km', time: '1 hr' },
    ]

    const idNumber = Number(id);

    const activity = activityDetails[idNumber];

    if (!activity) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Activity not found</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, marginBottom: 16 }}>{activity.name}</Text>
            <Text>Distance: {activity.distance}</Text>
            <Text>Time: {activity.time}</Text>
            <Button title="Go Back" onPress={() => router.back()} />
        </View>
    );
}
