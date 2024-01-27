import { Form } from "@remix-run/react";
import { categories } from "~/types/task";

export function Taskform() {
  return (
    <Form method="post">
      <div className="mb-5">
        <label htmlFor="category" className="font-semibold mb-2 block">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="border-2 w-full rounded-md mr-8 border-gray-600 px-3 py-1 h-9"
          defaultValue={categories[0].name}
        >
          {categories.map((category, idx) => (
            <option key={idx} value={category.value}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <label className="font-semibold mb-2 block" htmlFor="message">
          Task
        </label>
        <textarea
          id="message"
          name="message"
          className="border-2 w-full rounded-md mr-8 border-gray-600 px-3 py-1"
        />
      </div>
      <div>
        <button
          type="submit"
          name="action"
          value="new"
          className="w-full rounded-xl bg-red-500 px-3 py-2 text-white font-semibold transition duration-300 ease-in-out hover:bg-red-600"
        >
          Add task
        </button>
      </div>
    </Form>
  );
}
