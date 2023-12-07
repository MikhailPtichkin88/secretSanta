import {createRoot} from "react-dom/client";
import {App} from "@/components/App";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {LazyExoticComponent, ReactNode, Suspense} from "react";
import {Shop} from "./pages/shop";
import {About} from "./pages/about";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root not found");
}
export type RouteElement =
  | LazyExoticComponent<() => ReactNode>
  | ReactNode
  | JSX.Element;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/about",
        element: (
          <Suspense fallback={"...loading"}>
            <About />
          </Suspense>
        ) as any,
      },
      {
        path: "/shop",
        element: (
          <Suspense fallback={"...loading"}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]);

const container = createRoot(root);
container.render(<RouterProvider router={router} />);
