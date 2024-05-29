import dbConnect from "@/db/connect";
import EmotionEntries from "@/db/models/emotionEntries";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === `GET`) {
    const emotionEntries = await EmotionEntries.findById(id);

    if (!emotionEntries) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(emotionEntries);
  }

  if (request.method === `PATCH`) {
    const updateEmotionEntry = request.body;
    await EmotionEntries.findByIdAndUpdate(id, updateEmotionEntry);

    response.status(200).json({ status: "Emotion Entry successfully updated" });
  }

  if (request.method === `DELETE`) {
    await EmotionEntries.findByIdAndDelete(id);

    response.status(200).json({ status: "Emotion Entry was deleted!" });
  }
}
