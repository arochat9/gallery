// "use client";
// import { Modal } from "./modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  return <div>{photoId}</div>;
}
