import dbConnect from "@/db/connect";
import EmotionEntry from "@/db/models/emotionEntry";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === `GET`) {
    const emotionEntries = await EmotionEntry.find();
    return response.status(200).json(emotionEntries);
  }

  if (request.method === `POST`) {
    try {
      const emotionEntryData = request.body;
      await EmotionEntry.create(emotionEntryData);

      response.status(201).json({ status: "Emotion Entry created" });
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: error.message });
    }
  }
}
