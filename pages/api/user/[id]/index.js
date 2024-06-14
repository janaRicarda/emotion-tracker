import dbConnect from "@/db/connect";
import User from "@/db/models/user";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === "GET") {
    const user = await User.findById({
      owner: session.user.email,
    });
    return response.status(200).json(user);
  }
  if (request.method === "PUT") {
    try {
      const userData = request.body;
      await User.findById({ ...userData, owner: session.user.email });
      response.status(200).json({ status: "User updated successfully" });
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  }
}
