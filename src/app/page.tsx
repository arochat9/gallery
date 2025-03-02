import { asc } from "drizzle-orm";
import { db } from "../server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => asc(model.createdAt),
  });
  console.log(images);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex w-48 flex-col">
            <img src={image.url} alt={`Image ${image.name}`} />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
