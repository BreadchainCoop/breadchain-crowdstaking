import React from "react";

import ReactMarkdown from "react-markdown";

import markdown from "../../info";

const BreadchainInfo: React.FC<React.PropsWithChildren<unknown>> = () => {
  return (
    <section className="prose prose-sm prose-pink md:prose md:prose-pink prose-invert  m-auto px-4 py-16 sm:px-4 md:px-6">
      <ReactMarkdown>{markdown}</ReactMarkdown>
      {/* <div class="accordion" id="accordionExample">
        <div class="accordion-item bg-white border border-gray-200">
          <h2 class="accordion-header mb-0" id="headingOne">
            <button
              class="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      "
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Accordion Item #1
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body py-4 px-5">
              <strong>This is the first item's accordion body.</strong> It is
              shown by default, until the collapse plugin adds the appropriate
              classes that we use to style each element. These classes control
              the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just
              about any HTML can go within the <code>.accordion-body</code>,
              though the transition does limit overflow.
            </div>
          </div>
        </div>
        
      </div> */}
    </section>
  );
};

export default BreadchainInfo;
