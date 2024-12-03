import { useAuthSession } from '@/hooks/useAuthSession/useAuthSession';
import { MainButton } from '@/ui/components/common/buttons';
import { PageContainer } from '@/ui/components/common/PageContainer/PageContainer';
import { Text, View } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useRouter } from 'expo-router';
import { useEffect } from 'react';


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    const router = useRouter();

    const { isLoggedIn, promptAsync, isLoading } = useAuthSession();
    
    useEffect(() => {
        if (isLoggedIn) {
            router.replace('./statistics');
        }
    }, [isLoggedIn]);
    return (
        <PageContainer>
            <View
                className='flex flex-col justify-center items-center p-6 w-full'
            >
                <MainButton
                    isLoading={isLoading}
                    text='Login with Strava'
                    variant='background'
                    onPress={() => promptAsync()}
                />
            </View>
        </PageContainer>

    )
}
