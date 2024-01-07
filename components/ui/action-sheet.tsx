import React, { useState } from 'react'
import { LucideIcon, Menu } from 'lucide-react-native'
import { 
    Actionsheet,
    ActionsheetBackdrop,
    ActionsheetContent,
    ActionsheetDragIndicator,
    ActionsheetDragIndicatorWrapper,
    ActionsheetItem,
    ActionsheetItemText,
    Box,
    Button,
    ButtonText,
    Icon
} from '@gluestack-ui/themed'; 

interface ActionSheetProps {
  title?: string;
  icon?: LucideIcon;
}

export function ActionSheet({ icon, title } : ActionSheetProps) {
    const [showActionsheet, setShowActionsheet] = useState(false)
    const handleClose = () => setShowActionsheet(!showActionsheet)

    return (
      <Box>
        <Button onPress={handleClose} width={"$16"} bgColor="$backgroundLight100">
          {
            title && !icon && (
              <Box>
                <ButtonText>
                  {title}
                </ButtonText>
              </Box>
            )
          }
          {
            icon && !title && (
              <Box>
                <Icon as={icon} size="lg" />
              </Box>
            )
          }
          {
            !icon && !title && (
              <Box>
                <Icon as={Menu} size="lg" color="$black" />
              </Box>
            )
          }
        </Button>
        <Actionsheet isOpen={showActionsheet} onClose={handleClose} zIndex={999}>
          <ActionsheetBackdrop />
          <ActionsheetContent h="$72" zIndex={999}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            <ActionsheetItem onPress={handleClose}>
              <ActionsheetItemText>Delete</ActionsheetItemText>
            </ActionsheetItem>
          </ActionsheetContent>
        </Actionsheet>
      </Box>
    )
}