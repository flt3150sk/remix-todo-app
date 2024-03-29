import { Link, useActionData } from "@remix-run/react";
import {
  ActionFunction,
  LoaderFunction,
  json,
  MetaFunction,
} from "@remix-run/node";
import { Layout } from "~/components/layout";
import { TextField } from "~/components/textfield";
import { useState } from "react";
import { createUser } from "~/utils/user.server";
import { authenticator } from "~/utils/auth.server";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App signup" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  return { user };
};

export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const action = form.get("_action");
  const email = form.get("email");
  const password = form.get("password");
  const name = form.get("name");

  if (
    typeof action !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof name !== "string"
  ) {
    return json({ error: "Invalid Form Data", form: action }, { status: 400 });
  }

  await createUser({ email, password, name });

  return await authenticator.authenticate("form", request, {
    successRedirect: "/",
    failureRedirect: "/signup",
    context: { formData: form },
  });
};

export default function Signup() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState({
    email: actionData?.fields?.email || "",
    password: actionData?.fields?.password || "",
    name: actionData?.fields?.name || "",
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
          <h2 className="text-3xl font-extrabold text-black mb-5">
            Create an account
          </h2>
          <TextField
            htmlFor="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
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
              Create an account
            </button>
          </div>
        </form>
        <p className="text-gray-600">
          Already have an account?
          <Link to="/login">
            <span className="text-red-600 px-2 underline">Login</span>
          </Link>
        </p>
      </div>
    </Layout>
  );
}
