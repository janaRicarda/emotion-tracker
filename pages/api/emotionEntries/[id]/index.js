import dbConnect from "@/db/connect";
import EmotionEntries from "@/db/models/emotionEntries";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "../../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  const session = await getServerSession(request, response, AuthOptions);

  if (!session) {
    response.status(401).json({ status: "Not authorized" });
    return;
  }

  if (request.method === `GET`) {
    try {
      const emotionEntries = await EmotionEntries.findById(id);
      return response.status(200).json(emotionEntries);
    } catch (error) {
      console.error(error);
      return response.status(404).json({ status: "Not Found" });
    }
  }

  if (request.method === `PATCH`) {
    try {
      const updateEmotionEntry = request.body;
      await EmotionEntries.findByIdAndUpdate(id, updateEmotionEntry);

      return response
        .status(200)
        .json({ status: "Emotion Entry successfully updated" });
    } catch (error) {
      console.error(error);
    }
  }

  if (request.method === `DELETE`) {
    try {
      await EmotionEntries.findByIdAndDelete(id);

      response.status(200).json({ status: "Emotion Entry was deleted!" });
    } catch (error) {
      console.error(error);
    }
  }
}
