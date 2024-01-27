import { prisma } from "./prisma.server";
import { json } from "@remix-run/node";
import { TaskData } from "~/types/task";

export const getMyTasks = async (userId: string) => {
  if (userId) {
    const tasksById = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        task: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return tasksById;
  }

  return json({ error: "The users does not have any tasks" }, { status: 404 });
};

export const createTask = async ({ category, message, postedBy }: TaskData) => {
  const taskById = await prisma.task.create({
    data: {
      category,
      message,
      postedBy,
    },
  });

  if (!taskById) {
    return json({ error: "Could not post the task" }, { status: 500 });
  }

  return json({
    message: "Task created successfully",
    success: true,
    payload: taskById,
  });
};

export const deleteTask = async (taskId: string) => {
  const taskById = await prisma.task.delete({
    where: {
      id: taskId,
    },
  });

  if (!taskById) {
    return json({ error: "Could not delete the task" }, { status: 500 });
  }

  return json({
    message: "Task deleted successfully",
    success: true,
    payload: taskById,
  });
};
