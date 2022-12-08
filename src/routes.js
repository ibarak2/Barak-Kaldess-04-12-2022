import { FavoritesPage } from "./pages/favorites-page.jsx"
import { HomePage } from "./pages/home-page.jsx"


const routes = [
    {
        path: "/home",
        component: <HomePage />,
        label: "Home",
    },
    {
        path: "/favorites",
        component: <FavoritesPage />,
        label: "Favorites Page",
    },
]

export default routes
