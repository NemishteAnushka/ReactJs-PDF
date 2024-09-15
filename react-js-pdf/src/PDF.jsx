import { useRef } from "react";
import reactLogo from "./assets/react.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
function PDF() {
  const pdfRef = useRef();
  const handleDownload = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save("invoice.pdf");
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
