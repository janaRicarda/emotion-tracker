import dbConnect from "@/db/connect";
import User from "@/db/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const { email } = request.query;
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === `GET`) {
    try {
      const user = await User.find();
      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error.message });
    }
  }
  if (request.method === `POST`) {
    try {
      const userData = request.body;
      await User.create({ ...userData });
      response.status(201).json({ status: "User created" });
    } catch {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PATCH") {
    try {
      const userData = request.body;
      await User.findByEmailAndUpdate({ email: email, userData });
      return response.status(200).json({ status: "User updated successfully" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
