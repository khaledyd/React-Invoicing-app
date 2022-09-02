import React from "react";
import "./invoice.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Invoice() {
  const [invoice, setInvoice] = useState([]);

  useEffect(() => {
    const createinvice = async () => {
      const res = await axios.get("/invoices");
      setInvoice(res.data);
      console.log(res.data);
    };
    createinvice();
  }, []);

  return (
    <div className="invoice">
      <div className="invoice-nav">
        <h1 className="servicetitle">Invoice</h1>
        <div className="date-and-id">
          <p className="id"> ID: 12</p>
          <p className="date">12-12-2022</p>
        </div>
      </div>

      <hr className="hr-one" />

      <div className="customername">
        <p className="customername">Name: khalid dahir</p>
      </div>
      <hr className="hr-name" />

      <div className="invoice-data">
        <p className="servicetypee">servicetype</p>
        <p className="numberofitemss">numberofitems</p>
        <p className="price">price</p>
        <p className="descount">descount</p>
  
      </div>
      <hr className="hr-two" />
      <div className="invoice-data-result">
        <p className="servicetypeee">web </p>
        <p className="numberofitemsss">12</p>
        <p className="pricee">$20</p>
        <p className="descountt">$2</p>
       
      </div>

      <div className="subtotal-items">
        <p className="subtotal-value">subtotal</p>
        <p className="discount-rate">discount rate</p>
      </div>

      <hr className="hr-three " />
      <div className="alltotal">
        <h3 className="alltotal">Total</h3>
      </div>
    </div>
  );
}
