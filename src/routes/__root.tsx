import { createRootRoute, Outlet, Link } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet /> {/* aquí renderizan las rutas hijas */}
    </>
  ),
});
