import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function PDF() {
  const pdfRef = useRef();
  const handleDownload = () => {
    const input = pdfRef.current; // This retrieves the DOM element that the pdfRef is attached to (the div containing the invoice) using the useRef() hook.
    html2canvas(input).then((canvas) => {
      //The html2canvas() function is used to take a screenshot of the input element. It converts the DOM element into a canvas element. This canvas represents the entire content of the invoice as an image.
      const imgData = canvas.toDataURL("image/png"); //The canvas.toDataURL() method converts the canvas into a base64 image (in this case, a PNG). This is the image format that will be added to the PDF.
      const pdf = new jsPDF("p", "mm", "a4", true);
      //A new PDF document is created using the jsPDF library. The parameters here are:
      // "p": Portrait mode (you could use "l" for landscape mode).
      // "mm": Measurement unit in millimeters.
      // "a4": Page size A4.
      // true: Enable use of the compress option (optional).
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      //This retrieves the dimensions of the A4 PDF page in millimeters.
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      //The dimensions of the captured canvas (the image of the invoice) are fetched here.
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      //The scaling ratio is calculated to ensure the image fits within the PDF's dimensions while maintaining the aspect ratio. This is done by comparing the width and height of both the image and the PDF, then picking the smaller ratio.
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      //imgX: Centers the image horizontally on the page.
      // imgY: The Y position is fixed to 30mm from the top (you can adjust this as needed).
      let totalPages = Math.ceil((imageHeight * ratio) / pdfHeight);

      for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
        if (pageNumber > 1) pdf.addPage(); // Add a new page for content overflow

        pdf.addImage(
          imgData,
          "PNG",
          imgX,
          imgY,
          imageWidth * ratio,
          imageHeight * ratio
        );
        // Set font size before adding page number
        pdf.setFontSize(12); // Set the font size to 12 (adjust as necessary)
        // Add page number at the bottom of each page
        pdf.text(
          `Page ${pageNumber} of ${totalPages}`,
          pdfWidth / 2, // Center horizontally
          pdfHeight - 10, // 10mm from the bottom
          { align: "center" }
        );
      }
      //This adds the captured image (imgData) to the PDF at the calculated position (imgX, imgY) and scales it using the ratio.
      pdf.save("invoice.pdf");
      //Finally, the PDF is saved with the filename "invoice.pdf" when the user clicks the "Download" button.
    });
  };
  return (
    <>
      <div className="border" ref={pdfRef}>
        <div className="displayFlex">
          <div>
            <img src={reactLogo} width={100} alt="React logo" />
          </div>
          <div>
            <h1>Invoice</h1>
          </div>
        </div>
        <div className="margin">
          <h3>Invoice Number : 12345 </h3>
          <h3>Invoice Date : Oct 23,2001</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Product 1</td>
              <td>2</td>
              <td>$10</td>
              <td>$20</td>
            </tr>
            <tr>
              <td>Product 2</td>
              <td>1</td>
              <td>$15</td>
              <td>$15</td>
            </tr>
            <tr>
              <td>Product 3</td>
              <td>5</td>
              <td>$8</td>
              <td>$40</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="primary-button" onClick={handleDownload}>
        Download
      </button>
    </>
  );
}

export default PDF;
