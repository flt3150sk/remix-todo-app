import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return { user };
};

export default function Index() {
  return (
    <div>
      <h1 className="text-red-600">Welcome to Remix</h1>
    </div>
  );
}
