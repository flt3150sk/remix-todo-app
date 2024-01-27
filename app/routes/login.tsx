import { Link, useActionData } from "@remix-run/react";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { Layout } from "~/components/layout";
import { TextField } from "~/components/textfield";
import { useState } from "react";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App login" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  return { user };
};

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};

export default function Login() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email,
    password: actionData?.fields?.password,
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Layout>
      <div className="h-full justify-center bg-yellow-100 items-center flex flex-col gap-y-5">
        <form method="post" className="rounded-2xl bg-white p-6 w-96">
          <h2 className="text-3xl font-extrabold text-black mb-5">Login</h2>
          <TextField
            htmlFor="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            htmlFor="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="w-full text-center mt-5">
            <button
              type="submit"
              name="_action"
              value="Sign In"
              className="w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-gray-600">
          D'ont have an account?
          <Link to="/signup">
            <span className="text-red-600 px-2 underline">Signup</span>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
