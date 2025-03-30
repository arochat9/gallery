import FullPageImageView from "~/common/full-page-image-view";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  if (Number.isNaN(Number(photoId))) {
    throw new Error("Invalid photo ID");
  }

  return <FullPageImageView id={Number(photoId)} />;
}
