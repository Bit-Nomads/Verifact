import { type RouteConfig, index, route, prefix } from "@react-router/dev/routes";


export default [
    index("routes/home.tsx"),
    route("chat", "routes/dashboard/prompt.tsx"),
    ...prefix("chat", [
        route("history", "routes/dashboard/history.tsx"),
        route(":id", "routes/dashboard/historyDetails.tsx"),
        route("/profile", "routes/dashboard/profile.tsx"),
        route("settings", "routes/dashboard/settings.tsx"),
        route("security", "routes/dashboard/security.tsx"),

      ]),
    
] satisfies RouteConfig;

