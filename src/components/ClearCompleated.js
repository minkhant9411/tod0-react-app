import React from "react";

export default function ClearCompleated({ clearCompleated }) {
  return (
    <div>
      <button className="button" onClick={clearCompleated}>
        Clear completed
      </button>
    </div>
  );
}
