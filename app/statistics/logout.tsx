import { useLogout } from "@/hooks/useLogOut/useLogOut";
import { MainButton } from "@/ui/components/common/buttons";
import { PageContainer } from "@/ui/components/common/PageContainer/PageContainer";
import { View } from "react-native";

export default function Logout() {
  
    const { mutate: logout, isPending } = useLogout();

    return (
        <PageContainer>
            <View className="flex flex-col justify-center items-center p-6 w-full">
                <MainButton
                    isLoading={isPending}
                    text="Logout"
                    variant="background"
                    onPress={() => logout()}
                />
            </View>
        </PageContainer>
    );
}