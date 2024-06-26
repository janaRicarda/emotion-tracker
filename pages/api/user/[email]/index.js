import dbConnect from "@/db/connect";
import User from "@/db/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { email } = request.query;

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "GET") {
    const user = await User.findOne({ email: email });
    return response.status(200).json(user);
  }
  if (request.method === "POST") {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      response.status(409).json({ message: "User already exists" });
      return;
    }
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
      await User.findOneAndUpdate({ email: email }, userData);
      return response.status(200).json({ status: "User updated successfully" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
