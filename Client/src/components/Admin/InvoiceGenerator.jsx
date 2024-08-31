import React from 'react';
import jsPDF from 'jspdf';
import { useGetProfileQuery } from '../../services/adminApi';

const InvoiceGenerator = ({ orderDetails }) => {
    // Use the hook to get the profile data
    const { data: adminProfile, error, isLoading } = useGetProfileQuery();

    // Function to generate the PDF
    const generateInvoicePdf = () => {
        if (isLoading) {
            // Handle loading state if needed
            return;
        }

        if (error) {
            console.error('Failed to fetch admin profile:', error);
            return;
        }

        const doc = new jsPDF();
        const lineHeight = 10; // Adjust as needed
        const margin = 20;
        const yStart = 20;

        // Set title
        doc.setFontSize(20);
        doc.text('Invoice', 105, yStart, null, null, 'center');
        
        let yPos = yStart + 15;

        // Add admin details
        if (adminProfile) {
            doc.setFontSize(12);
            doc.text(adminProfile.restaurantName, 105, yPos, null, null, 'center');
            doc.text(adminProfile.mobileNumber, 105, yPos + lineHeight, null, null, 'center'); // Add phone number
            doc.line(margin, yPos + lineHeight + 2, 190 - margin, yPos + lineHeight + 2); // Draw underline
            yPos += lineHeight * 2; // Move y position below the underline

            doc.text(`Customer Name: ${orderDetails.contactDetail.name}`, 105, yPos, null, null, 'center');
            doc.text(`Customer Mobile Number: ${orderDetails.contactDetail.mobile}`, 105, yPos + lineHeight, null, null, 'center');
            doc.line(margin, yPos + lineHeight + 2, 190 - margin, yPos + lineHeight + 2); // Draw underline
            yPos += lineHeight * 2; // Move y position below the underline

            // Add order details
            doc.setFontSize(12);
            const orderDetailsText = [
                `Order No: ${orderDetails._id}`,
                `Order Time: ${new Date(orderDetails.createdAt).toLocaleString('en-GB', { hour12: true })}`,
                `Order Type: ${orderDetails.orderType}`,
                `Payment Mode: ${orderDetails.transactionDetail}`,
                `Payment Status: ${orderDetails.paymentStatus}`
            ];
            orderDetailsText.forEach((text, index) => {
                doc.text(text, margin, yPos);
                yPos += lineHeight;
            });
            doc.line(margin, yPos + 2, 190 - margin, yPos + 2); // Draw underline
            yPos += lineHeight; // Move y position below the underlineion below the underline

            // Add table header
            doc.text('Item Name', margin, yPos);
            doc.text('Qty', 105, yPos);
            doc.text('Price', 130, yPos);
            doc.text('Total', 160, yPos);
            doc.line(margin, yPos + lineHeight / 2, 190 - margin, yPos + lineHeight / 2); // Draw underline
            yPos += lineHeight;

            // Add table rows
            let subtotal = 0;
            orderDetails.cartItem.forEach((item, index) => {
                doc.text(item.name, margin, yPos);
                doc.text(item.quantity.toString(), 105, yPos, null, null, 'right');
                doc.text(`₹${item.price.toFixed(2)}`, 130, yPos, null, null, 'right');
                const totalPrice = item.quantity * item.price;
                doc.text(`₹${totalPrice.toFixed(2)}`, 160, yPos, null, null, 'right');
                yPos += lineHeight;
                subtotal += totalPrice;
            });

            // Add totals
            doc.line(margin, yPos, 190 - margin, yPos); // Draw underline
            yPos += lineHeight;
            doc.text('Subtotal', margin, yPos);
            doc.text(`₹${subtotal.toFixed(2)}`, 160, yPos, null, null, 'right');
            yPos += lineHeight;
            doc.text('Gross Total', margin, yPos);
            doc.text(`₹${subtotal.toFixed(2)}`, 160, yPos, null, null, 'right');

            // Save the PDF
            doc.save(`Invoice_${orderDetails._id}.pdf`);
        }
    };

    return (
        <div className="text-blue-500 text-sm underline cursor-pointer" onClick={generateInvoicePdf}>
            View Invoice
        </div>
    );
};

export default InvoiceGenerator;
