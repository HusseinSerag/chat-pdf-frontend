import { EmbedPDF } from "@simplepdf/react-embed-pdf";

interface PDFViewerProps {
  pdf_url: string;
}

export default function PDFViewer({ pdf_url }: PDFViewerProps) {
  return (
    <>
      <EmbedPDF
        documentURL={pdf_url}
        locale="en"
        mode="inline"
        className="w-full flex-1"
      />
    </>
  );
}
