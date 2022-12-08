import { Routes, Route } from "react-router"
import { Header } from "./cmps/header"

import routes from "./routes"


export function RootCmp() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              element={route.component}
              path={route.path}
            />
          ))}
        </Routes>
      </main>
    </div>
  )
}