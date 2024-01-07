import { Text, Box } from '@gluestack-ui/themed'
import { AvatarComponent } from '../ui/avatar'

export const DashboardHeader = () => {
    return (
        <Box 
            display='flex' flexDirection='row' justifyContent="space-between" width="$full"
        >
            <Text 
                fontSize={"$4xl"} 
                paddingTop={"$7"} 
                paddingLeft={"$4"} 
                fontWeight="$semibold"
            >
                Dashboard
            </Text>

            <Box
                paddingTop={"$2"}
                paddingRight={"$7"}
            >
                <AvatarComponent />
            </Box>
        </Box>
    )
}