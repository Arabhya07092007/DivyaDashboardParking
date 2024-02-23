export type Package = {
  customerName: string;   // Name of the customer
  orderTime: string;      // Time when the order was placed (format: "YYYY-MM-DDTHH:MM:SSZ")
  checkInDate: string;    // Date of check-in (format: "YYYY-MM-DD")
  trackingID: string;     // Tracking ID of the order
  orderValue: number;     // Value of the order
  hotelName: string;      // Name of the hotel
  status: string;         // Status of the order (e.g., Paid, Unpaid, Pending)
};
