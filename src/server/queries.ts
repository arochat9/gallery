import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { images } from "./db/schema";
import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { redirect, RedirectType } from "next/navigation";
import analyticsServerClient from "./analytics";

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
          // redirect("/");
          throw new Error("Not found");
        }
        if (image.userId !== user.userId) {
          throw new Error("Unauthorized");
        }
        return image;
      });
  });
}

export async function deleteImage(id: number) {
  const user = await auth();
  if (!user.userId) {
    throw new Error("Unauthorized");
  }
  console.log("deleting");
  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "user deleted image",
    properties: {
      imageId: id,
    },
  });
  redirect("/");
}
