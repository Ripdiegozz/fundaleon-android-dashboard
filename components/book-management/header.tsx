import { Text, Box } from '@gluestack-ui/themed'
import { AvatarComponent } from '../ui/avatar'

export const DashboardHeader = ({ title } : {title : string}) => {
    return (
        <Box 
            display='flex' flexDirection='row' justifyContent="space-between" width="$full"
        >
            <Text 
                fontSize={"$4xl"} 
                paddingTop={"$6"}
                paddingLeft={"$4"} 
                fontWeight="$semibold"
            >
                {title}
            </Text>

            <Box
                paddingTop={"$1"}
                paddingRight={"$4"}
            >
                <AvatarComponent />
            </Box>
        </Box>
    )
}