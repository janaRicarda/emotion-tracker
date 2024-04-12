export default function EmotionDetails({
  name,
  description,
  emotionfunction,
  indications,
  subemotions,
}) {
  return (
    <>
      <article>
        <h1>{name}</h1>
        <p>{description}</p>
        <h2>The function of {name}</h2>
        <p>{emotionfunction}</p>
        <h2>Physical indications</h2>
        <p>{indications}</p>
        <h2>Subemotions</h2>
        <ul></ul>
      </article>
    </>
  );
}
