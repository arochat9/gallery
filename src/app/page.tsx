import Link from "next/link";
import { db } from "../server/db";

const mockURLs = [
  "https://lfp7jezmxg.ufs.sh/f/V1haWO7ECfU99nhi4w7QjpQutiANWh9IH4D3EBOT0V8kX6aF",
  "https://lfp7jezmxg.ufs.sh/f/V1haWO7ECfU9krwUN0FtLflbuysXz4K62j8w0QnN3r7CedPD",
  "https://lfp7jezmxg.ufs.sh/f/V1haWO7ECfU9hsOrkpnr0UMg4SoCpLH9IewDRAPzNJFdBuZX",
  "https://lfp7jezmxg.ufs.sh/f/V1haWO7ECfU9GS5oecVhnEPX1SpDOUTV80sYIRq2aFyiMmrW",
  "https://lfp7jezmxg.ufs.sh/f/V1haWO7ECfU93nGB3BxYGp50NBcTgea7MbkfzFd6EIX8iUwl",
  "https://lfp7jezmxg.ufs.sh/f/V1haWO7ECfU9TZf7Bqot5NbdiYZ91F7wcLE4qDSBvpa2HuWf",
  "https://lfp7jezmxg.ufs.sh/f/V1haWO7ECfU9itNiEwjsZELWcfG2HdD6aXoylBgYtMqTvRK8",
];

const mockImages = [...mockURLs, ...mockURLs, ...mockURLs].map((url, i) => ({
  id: i + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id} className="w-48">
            {post.name}
          </div>
        ))}
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt={`Image ${image.id}`} />
          </div>
        ))}
      </div>
    </main>
  );
}
