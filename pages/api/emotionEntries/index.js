import dbConnect from "@/db/connect";
import EmotionEntries from "@/db/models/emotionEntries";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === `GET`) {
    try {
      const emotionEntries = await EmotionEntries.find({
        owner: session.user.email,
      });
      return response.status(200).json(emotionEntries);
    } catch (error) {
      console.error(error);
    }
  } else if (request.method === `POST`) {
    try {
      const emotionEntryData = request.body;
      await EmotionEntries.create({
        ...emotionEntryData,
        owner: session.user.email,
      });
      response.status(201).json({ status: "Emotion Entry created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
