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
                    name="books/book-list" 
                    options={{
                        href: "books/book-list",
                        headerShown: false,
                        tabBarLabel: "Libros",
                        tabBarIcon: ({ color, size }) => (
                            <BookIcon size={size} color={color} />
                        ),
                    }}
                />

                {/* Hide some books routes */}
                <Tabs.Screen
                    name="books/book-edit"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="books/book-add"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="books/book-view"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
                <Tabs.Screen
                    name="books/book-delete"
                    options={{
                        href: null,
                        headerShown: false,
                    }}
                />
            </Tabs>
        </>     
    )
}
