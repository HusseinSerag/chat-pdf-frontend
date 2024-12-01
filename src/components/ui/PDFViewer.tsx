interface PDFViewerProps {
  pdf_url: string;
}

export default function PDFViewer({ pdf_url }: PDFViewerProps) {
  return (
    <>
      <iframe
        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
          pdf_url
        )}&embedded=true`}
        className="w-full flex-1"
      ></iframe>
    </>
  );
}
