import { Tabs } from "expo-router"
import { BookIcon, LayoutDashboardIcon } from "lucide-react-native"

export default () => {
    return (
        <>
            <Tabs>
                {/* Show functional routes */}
                <Tabs.Screen 
                    name="dashboard" 
                    options={{
                        href: "/dashboard",
                        headerShown: false,
                        tabBarLabel: "Dashboard",
                        tabBarIcon: ({ color, size }) => (
                            <LayoutDashboardIcon size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen 
                    name="books"
                    options={{
                        href: "books/book-list",
                        headerShown: false,
                        tabBarLabel: "Libros",
                        tabBarIcon: ({ color, size }) => (
                            <BookIcon size={size} color={color} />
                        ),
                    }}
                />
            </Tabs>
        </>     
    )
}
