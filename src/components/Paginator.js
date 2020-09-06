import "./Paginator.css";

function Paginator({ totalPages, currentPage, onPageChange } = {}) {
  function createPaginator() {
    const container = document.createElement("div");
    container.classList.add("paginator");

    const prevButton = document.createElement("button");
    prevButton.innerHTML = `<span>&larr; Previous</span>`;

    if (currentPage !== 1) {
      prevButton.addEventListener("click", function () {
        onPageChange(currentPage - 1);
      });
    } else {
      prevButton.setAttribute("disabled", "disabled");
    }

    const nextButton = document.createElement("button");
    nextButton.innerHTML = `<span>&rarr; Next</span>`;

    if (currentPage !== totalPages) {
      nextButton.addEventListener("click", function () {
        onPageChange(currentPage + 1);
      });
    } else {
      nextButton.setAttribute("disabled", "disabled");
    }

    const totalNode = document.createElement("span");

    totalNode.innerText = `Page ${currentPage} of ${totalPages}`;

    container.appendChild(prevButton);
    container.appendChild(nextButton);
    container.appendChild(totalNode);

    return container;
  }
  return createPaginator();
}

export default Paginator;
