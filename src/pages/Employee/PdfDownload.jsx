import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintPdf from './PrintPdf'
import { useLoaderData } from "react-router-dom";

const PdfDownload = () => {
  const data = useLoaderData()
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <PDFDownloadLink document={<PrintPdf data={data} />} className="border py-3 px-4 absolute top-1/2 left-2/5 hover:bg-teal-300" fileName="Asset.pdf">
        {({ loading }) => (loading ? "Loading Document..." : "Download PDF")}
      </PDFDownloadLink>
    </div>
  );
};

export default PdfDownload;