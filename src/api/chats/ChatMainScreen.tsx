import PDFViewer from "@/components/ui/PDFViewer";
import useGetChat from "./useGetChat";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import ChatComponent from "./ChatComponent";

export default function ChatMainBody() {
  const { data } = useGetChat();
  if (!data) {
    return (
      <div className="flex-1 h-screen  w-full flex flex-col gap-2 items-center justify-center">
        <h1 className="font-semibold">No chats yet?</h1>
        <Button>
          <Link to={"/"}>Get Started now!</Link>
        </Button>
      </div>
    );
  }
  return (
    <>
      <div className="flex-[5] flex flex-col min-h-screen p-4 ">
        <h1 className="md:stext-2xl text-center sm:text-xl text-lg font-semibold">
          {data.pdfName}
        </h1>
        <PDFViewer pdf_url={data.pdfURL} />
      </div>
      <div className="flex-[3] border-l-4 border-l-slate-400">
        <ChatComponent fileKey={data.fileKey} />
      </div>
    </>
  );
}
