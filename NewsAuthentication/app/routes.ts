import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    route("chat", "routes/dashboard/prompt.tsx"),
    ...prefix("dashboard", [
        route("history", "routes/dashboard/history.tsx"),
        route(":id", "routes/dashboard/historyDetails.tsx"),
        route("profile", "routes/dashboard/profile.tsx"),
      ]),
    
] satisfies RouteConfig;