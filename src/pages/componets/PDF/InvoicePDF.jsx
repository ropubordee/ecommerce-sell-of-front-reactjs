import React from "react";
import { jsPDF } from "jspdf";
import { Printer } from "lucide-react";
import { font } from "./KhaidaowDemo-normal";
import autoTable from "jspdf-autotable";
import { dateFormat } from "../../utils/datefrom";
import { numberFormat } from "../../utils/number";
const InvoicePDF = ({ orders, selectedOrderId, cartTotal }) => {
  const handlePDF = () => {
    const selectedOrder = orders.find((order) => order.id === selectedOrderId);
    if (!selectedOrder) {
      alert("ไม่พบออเดอร์ที่เลือก");
      return;
    }

    const doc = new jsPDF();

    doc.addFileToVFS("MyFont.ttf", font);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");

    let width = doc.internal.pageSize.getWidth();

    doc.setFontSize(16);
    doc.text("ใบเสร็จข้อมูลสินค้า", width / 2, 10, { align: "center" });

    const products = selectedOrder.products.map((product) => [
      product.product.title,
      numberFormat(product.product.price),
      product.count,
      numberFormat(product.count * product.product.price),
      dateFormat(selectedOrder.updatedAt),
    ]);

    const content = {
      stateY: 30,
      head: [["รายการสินค้า", "ราคา", "จำนวน", "ราคารวม", "เวลาที่ซื้อ"]],
      body: products,
      styles: { font: "MyFont", fontSize: 12 },
      theme: "grid",
      headStyles: { fillColor: [100, 100, 255], textColor: [255, 255, 255] },
      bodyStyles: { fillColor: [240, 240, 240] },
      alternateRowStyles: { fillColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 40 },
        4: { cellWidth: 60 },
      },
    };

    doc.autoTable(content);

    const totalText = `ยอดรวมสุทธิ: ${numberFormat(cartTotal)}`;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(totalText, width - 20, doc.lastAutoTable.finalY + 10, {
      align: "right",
    });

    doc.setLineWidth(0.5);
    doc.setDrawColor(100, 100, 255);
    doc.line(
      width - 120,
      doc.lastAutoTable.finalY + 15,
      width - 20,
      doc.lastAutoTable.finalY + 15
    );

    doc.save(`invoice-${selectedOrder.id}.pdf`);
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handlePDF}
        className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <Printer className="text-white" />
          <div className="text-lg font-semibold">ดาวน์โหลดใบเสร็จ</div>
        </div>
      </button>
    </div>
  );
};

export default InvoicePDF;
