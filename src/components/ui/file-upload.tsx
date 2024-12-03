import { Inbox } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

interface FileUploadProps {
  createChat(file: File): void;
}
export default function FileUpload({ createChat }: FileUploadProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length == 1) createChat(acceptedFiles[0]);
    },
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    maxSize: 30 * 1024 * 1024,
    onDropRejected: () => {
      toast.error("Please upload 1 PDF!");
    },
  });
  return (
    <div className="bg-white  p-2 flex items-center rounded-md justify-center">
      <div
        {...getRootProps()}
        className="flex gap-2 cursor-pointer flex-col items-center rounded-md border-[3px] border-dashed border-gray-400 justify-center py-8 w-full bg-[#e0dee0] "
      >
        <Inbox className="text-blue-800 w-8 h-8" />
        <div className="text-sm text-gray-600 font-semibold">Drop PDF Here</div>
      </div>
      <input {...getInputProps()} />
    </div>
  );
}
