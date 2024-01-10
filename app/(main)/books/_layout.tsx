import { Tabs } from "expo-router"
import { BookIcon, LayoutDashboardIcon } from "lucide-react-native"

export default () => {
    return (
        <>
            <Tabs>
                {/* Show functional routes */}
                <Tabs.Screen 
                    name="book-list" 
                    options={{
                        href: "/book-list",
                        headerShown: false,
                        tabBarLabel: "Inventario",
                        tabBarIcon: ({ color, size }) => (
                            <LayoutDashboardIcon size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="book-edit"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="book-add"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="book-delete"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="details/[bookId]"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </>     
    )
}
