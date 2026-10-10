import { type RouteConfig, route } from "@react-router/dev/routes";

export default [route("/:sessionId?", "routes/home.tsx")] satisfies RouteConfig;
