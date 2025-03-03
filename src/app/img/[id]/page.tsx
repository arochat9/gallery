// "use client";
// import { Modal } from "./modal";

import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoIdPromise = params.then(({ id }) => id);
  const imagePromise = photoIdPromise.then((photoId) =>
    getImage(Number(photoId)),
  );

  const [photoId, image] = await Promise.all([photoIdPromise, imagePromise]);
  return (
    <div>
      <img src={image.url} alt={image.name} className="w-96" />
      <div>{image.name}</div>
    </div>
  );
}
