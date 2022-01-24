import React from "react";

function Review({ nextStep, backStep }) {
  return (
    <div>
      review
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button className="button-check-next" onClick={backStep}>
            Back to cart
          </button>
          <button
            type="submit"
            className="button-check-back"
            onClick={nextStep}
          >
            {" "}
            Next step
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
