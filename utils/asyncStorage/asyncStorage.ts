import AsyncStorage from '@react-native-async-storage/async-storage';


export const localUserHandler = () => {
    const getLocalUser = async () => {
        const userData = await AsyncStorage.getItem('@user')
        if (!userData) return null;
        return JSON.parse(userData);
    };

    const setLocalUser = async (user: any) => {
        await AsyncStorage.setItem('@user', JSON.stringify(user));
    };


    const removeLocalUser = async () => {
        await AsyncStorage.removeItem('@user');
    }
    return {
        getLocalUser,
        setLocalUser,
        removeLocalUser
    }
}


export const getLocalToken = async () => {
    const token = await AsyncStorage.getItem('@token')
    if (!token) return null;
    return token;
};

export const setLocalToken = async (token: string) => {
    await AsyncStorage.setItem('@token', token);
};

export const removeLocalToken = async () => {
    await AsyncStorage.removeItem('@token');
}



