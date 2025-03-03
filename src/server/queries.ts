import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
  return auth().then((user) => {
    if (!user.userId) {
      throw new Error("Unauthorized");
    }
    return db.query.images.findMany({
      where: (model, { eq }) => eq(model.userId, user.userId),
      orderBy: (model, { desc }) => desc(model.createdAt),
    });
  });
}

export async function getImage(id: number) {
  return auth().then((user) => {
    if (!user.userId) {
      throw new Error("Unauthorized");
    }

    return db.query.images
      .findFirst({ where: (model, { eq }) => eq(model.id, id) })
      .then((image) => {
        if (!image) {
          throw new Error("Not found");
        }
        if (image.userId !== user.userId) {
          throw new Error("Unauthorized");
        }
        return image;
      });
  });
}
