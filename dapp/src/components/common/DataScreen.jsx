import React, { useState } from "react";
import OfferTable from "./OfferTable";
import PropTypes from "prop-types";
import Pagination from "./Pagination";

function filterOffers(marketOffers, query) {
  console.log(marketOffers);
  return marketOffers.filter((o) =>
    o.description.toLowerCase().includes(query.toLowerCase())
  );
}

function pageOffers(offers, currentPage, sizePage) {
  /* 10 Offers, 4 size
  0-3 currentPage=1
  4-7 currentPage=2
  8-9 currentPage=3
  */
  return offers.filter(
    (o, index) =>
      index >= (currentPage - 1) * sizePage && index < currentPage * sizePage
  );
}

function DataScreen({ offers, columns }) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;

  const filteredOffers = filterOffers(offers, query);
  const filteredPagedOffers = pageOffers(filteredOffers, currentPage, pageSize);

  function handlePageChange(index) {
    setCurrentPage(index);
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col-4">
          <h3>Total: {filteredOffers.length}</h3>
        </div>

        <div className="col-8">
          <div className="input-group">
            <div className="input-group-prepend"></div>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => {
                setQuery(e.target.value);
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <OfferTable columns={columns} data={filteredPagedOffers} />
      <Pagination
        currentPage={currentPage}
        itemsCount={filteredOffers.length}
        onPageChange={handlePageChange}
        pageSize={pageSize}
      />
    </>
  );
}

DataScreen.propTypes = {
  offers: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
};

export default DataScreen;
