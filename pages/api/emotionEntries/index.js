import dbConnect from "@/db/connect";
import EmotionEntries from "@/db/models/emotionEntries";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === `GET`) {
    try {
      const emotionEntries = await EmotionEntries.find();
      return response.status(200).json(emotionEntries);
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: error.message });
    }
  }

  if (request.method === `POST`) {
    try {
      const emotionEntryData = request.body;
      await EmotionEntries.create(emotionEntryData);

      response.status(201).json({ status: "Emotion Entry created" });
    } catch (error) {
      console.error(error);
      response.status(400).json({ error: error.message });
    }
  }
}
