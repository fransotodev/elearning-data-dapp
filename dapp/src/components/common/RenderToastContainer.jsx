import React from "react";
import { ToastContainer } from "react-toastify";

const RenderToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
  />
);

export default RenderToastContainer;
