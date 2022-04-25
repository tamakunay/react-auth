import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="container mx-auto bg-gray-200">
      <h1>Unauthorized</h1>
      <div className="flex flex-grow">
        <button
          type="button"
          className="bg-gray-800 p-1 rounded-md px-4 text-white"
          onClick={goBack}
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
