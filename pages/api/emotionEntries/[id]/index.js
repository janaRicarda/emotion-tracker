import Sight from "@/db/models/Sights";
import EmotionEntry from "@/db/models/emotionEntry";

export default async function handler(request, response) {
  await dbConnect();

  const { id } = request.query;

  if (request.method === `GET`) {
    const emotionEntry = await EmotionEntry.findById(id);

    if (!emotionEntry) {
      return response.status(404).json({ status: "Not Found" });
    }
    return response.status(200).json(emotionEntry);
  }

  if (request.method === `PATCH`) {
    const updateEmotionEntry = request.body;
    await EmotionEntry.findByIdAndUpdate(id, updateEmotionEntry);

    response.status(200).json({ status: "Emotion Entry successfully updated" });
  }

  if (request.method === `DELETE`) {
    await EmotionEntry.findByIdAndDelete(id);

    response.status(200).json({ status: "Emotion Entry was deleted!" });
  }
}
