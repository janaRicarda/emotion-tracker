import dbConnect from "@/db/connect";
import EmotionEntries from "@/db/models/emotionEntries";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  const session = await getServerSession(request, response, authOptions);
  await dbConnect();

  if (request.method === `GET`) {
    try {
      if (session) {
        //const emotionEntries = await EmotionEntries.find();
        const emotionEntries = await EmotionEntries.find({
          owner: session.user.email,
        });
        response.status(200).json(emotionEntries);
      } else {
        const emotionEntries = await EmotionEntries.find({ owner: "default" });
        response.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      console.error(error);
    }
  } else if (request.method === `POST`) {
    try {
      if (session) {
        const emotionEntryData = request.body;
        //await EmotionEntries.create(emotionEntryData);
        await EmotionEntries.create({
          ...emotionEntryData,
          owner: session.user.email,
        });
        response.status(201).json({ status: "Emotion Entry created" });
      } else {
        response.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }

  // if (request.method === `GET`) {
  //   try {
  //     const emotionEntries = await EmotionEntries.find();
  //     return response.status(200).json(emotionEntries);
  //   } catch (error) {
  //     console.error(error);
  //     response.status(500).json({ error: error.message });
  //   }
  // }

  // if (request.method === `POST`) {
  //   try {
  //     const emotionEntryData = request.body;
  //     await EmotionEntries.create(emotionEntryData);

  //     response.status(201).json({ status: "Emotion Entry created" });
  //   } catch (error) {
  //     console.error(error);
  //     response.status(400).json({ error: error.message });
  //   }
  // }
}
