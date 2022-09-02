import React from "react";
import "./dashboard.css";
import axios from "axios";
import { useState, useRef } from "react";
import "../invoice/invoice.css";
import { Page, Text, View, Document, StyleSheet } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [price, setPrice] = useState("");
  const [descount, setDescount] = useState("");
  const [numberofitems, setNumberOfItems] = useState("");
  const [customername, setCustomername] = useState("");
  const [servicetype, setServicetype] = useState("");
  const [invoice, setInvoice] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/invoices/dashboard/", {
        price,
        descount,
        customername,
        numberofitems,
        servicetype,
      });
      setInvoice(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const printRef = useRef();
  const subtotal = invoice.price * invoice.numberofitems;
  const total = subtotal - subtotal * invoice.descount;

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("print.pdf");
  };
  return (
    <div className="dashboard">
      {invoice ? (
        <>
          <div className="invoice" ref={printRef}>
            <div className="invoice-nav">
              <h1 className="servicetitle">Invoice</h1>
              <div className="date-and-id">
                <p className="id"> ID:{invoice._id}</p>
                <p className="date">
                  {" "}
                  {new Date(invoice.createdAt).toDateString()}
                </p>
              </div>
            </div>

            <hr className="hr-one" />

            <div className="customername">
              <p className="customername">Name: {invoice.customername}</p>
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
              <p className="servicetypeee">{invoice.servicetype[0]} </p>
              <p className="numberofitemsss">{invoice.numberofitems}</p>
              <p className="pricee">${price}</p>
              <p className="descountt">{invoice.descount}%</p>
            </div>

            <div className="subtotal-items">
              <p className="subtotal-value">subtotal : ${subtotal}</p>
              <p className="discount-rate">
                discount rate : {invoice.descount}%
              </p>
            </div>

            <hr className="hr-three " />
            <div className="alltotal">
              <h3 className="alltotal">Total : ${total}</h3>
            </div>
          </div>
          {invoice && (
            <button
              className="download"
              type="button"
              onClick={handleDownloadPdf}
            >
              Download as PDF
            </button>
          )}
          {invoice && (
            <Link to="/dashboard">
            <button
              className="download"
              type="button"
             
            >
             Backto Home
            </button>
          </Link>
         
          )}
        </>
      ) : (
        <form onSubmit={handleSubmit} className="dashboard-form">
          <div className="bills">
            <p className="span-price">Price</p>
            <input
              className="price-input"
              type="number"
              placeholder="price"
              onChange={(e) => setPrice(e.target.value)}
            ></input>

            <p className="span-discount">discount</p>
            <input
              className="price-discount"
              type="number"
              step=".01"
              placeholder="discount"
              onChange={(e) => setDescount(e.target.value)}
            />
            <p className="span-numberofitems">numberofitems</p>
            <input
              className="price-numberofitems"
              type="number"
              placeholder="numberofitems"
              onChange={(e) => setNumberOfItems(e.target.value)}
            />
          </div>

          <div className="infos">
            <p className="span-castomer-name">customername</p>
            <input
              className="castomer-name-input"
              type="text"
              placeholder="customername"
              onChange={(e) => setCustomername(e.target.value)}
            />
            <p className="span-servicetype">servicetype</p>

            <select
              name="cars"
              className="input-servicetype"
              onChange={(e) => setServicetype(e.target.value)}
              required
            >

             <option value="select type of service"selected>select type of service</option>
              <option value="web devlopement">web devlopement</option>
              <option value="UX/UI desing">UX/UI desing</option>
              <option value="mobile app devlopement">
                mobile app devlopement
              </option>
              <option value="game devlopement" >game devlopement</option>
            </select>
          </div>
          <button className="btn-dashboard">Proceed</button>
        </form>
      )}
    </div>
  );
}
