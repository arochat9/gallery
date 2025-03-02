"use client";
import { useRouter } from "next/navigation";
import { EndpointArg, FileRoute } from "uploadthing/types";
import { UploadButton } from "~/utils/uploadthing";

type endpointArg = EndpointArg<
  {
    imageUploader: FileRoute<{
      input: undefined;
      output: {
        uploadedBy: string;
      };
      errorShape: JSON;
    }>;
  },
  "imageUploader"
>;

export default function Home(props: { endpoint: endpointArg }) {
  const router = useRouter();

  return (
    <main>
      <UploadButton
        endpoint={props.endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          //   console.log("Files: ", res);
          //   alert("Upload Completed");
          router.refresh();
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
