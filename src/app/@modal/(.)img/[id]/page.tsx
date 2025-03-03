import FullPageImageView from "~/components/full-image-page";
import { Modal } from "./modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const photoId = (await params).id;
  if (Number.isNaN(Number(photoId))) {
    throw new Error("Invalid photo ID");
  }

  return (
    <Modal>
      <FullPageImageView id={Number(photoId)} />
    </Modal>
  );
}
