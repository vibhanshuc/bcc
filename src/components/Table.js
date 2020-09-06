import "./Table.css";
import ComboBox from "./ComboBox";
import Paginator from "./Paginator";

function Table({ columns, data, config = {} }) {
  let searchText = "";
  const searchOptions = columns.filter((column) => column.isSearchable);

  let sortingColumn;
  let sortingOrder = "ASC";
  let searchOption;
  let currentPage = 1;
  const PER_PAGE = config.perPage || 5;
  let totalPages = Math.ceil(data.length / PER_PAGE);

  if (searchOptions.length > 0) {
    searchOption = searchOptions[0].accessor;
  }

  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table__container");

  const table = document.createElement("table");
  table.classList.add("table");

  const actionBar = document.createElement("div");
  actionBar.classList.add("table__action-bar");

  if (config.fixed) {
    table.classList.add("table--fixed-header");
  }

  function handleSearch({ option, text }) {
    searchText = text;
    if (option) {
      searchOption = option;
    }
    renderTable();
  }

  function handleSorting(columnName) {
    if (sortingColumn === columnName) {
      sortingOrder = sortingOrder === "ASC" ? "DSC" : "ASC";
    }
    sortingColumn = columnName;
    renderTable();
  }

  function handlePagination(nextPage) {
    currentPage = nextPage;
    renderPaginator();
    renderTable();
  }

  function createActionBar() {
    actionBar.appendChild(
      ComboBox({
        options: searchOptions.map((option) => ({
          label: option.label,
          value: option.accessor,
        })),
        onChange: handleSearch,
      })
    );

    renderPaginator();
    return actionBar;
  }

  function renderPaginator() {
    const paginator = Paginator({
      currentPage,
      totalPages,
      onPageChange: handlePagination,
    });
    console.log({ paginator });
    if (actionBar.childNodes[1]) {
      actionBar.childNodes[1].replaceWith(paginator);
    } else {
      actionBar.appendChild(paginator);
    }
  }

  function createTableHead(table) {
    const tHead = table.createTHead();
    const tHeadRow = tHead.insertRow();
    columns.forEach(({ label, accessor, sortable }) => {
      const th = document.createElement("th");
      let text = document.createTextNode(label);
      th.appendChild(text);
      if (sortable) {
        const span = document.createElement("span");
        span.innerHTML =
          sortingOrder === "DSC" ? "<i>&darr;</i>" : "<i>&uarr;</i>";
        th.addEventListener("click", () => {
          handleSorting(accessor);
        });
        th.style.cursor = "pointer";
        th.appendChild(span);
      }
      tHeadRow.appendChild(th);
    });
  }

  function createTableBody(table, _columns, _data) {
    const tBody = table.createTBody();
    _data.forEach((item) => {
      const row = tBody.insertRow();
      columns.forEach((column) => {
        const cell = row.insertCell();
        if (typeof column.render === "function") {
          cell.appendChild(column.render(item));
        } else {
          const textNode = document.createTextNode(
            item[column.accessor] || "-"
          );
          cell.appendChild(textNode);
        }
      });
    });
    tBody.style.height = `${window.innerHeight - 300}px`;
  }

  function getPaginatedData(_data) {
    const start = (currentPage - 1) * PER_PAGE;
    const end = currentPage * PER_PAGE;
    console.log({ currentPage, totalPages, start, end });
    return _data.slice(start, end);
  }

  function resolveData() {
    let _data = data;
    if (searchText && searchText.trim() !== "" && searchOption) {
      _data = _data.filter((item) => {
        return (
          item[searchOption]
            .toString()
            .toLowerCase()
            .indexOf(searchText.trim().toLowerCase()) !== -1
        );
      });
    }

    if (sortingColumn) {
      _data = _data.sort((a, b) => {
        return a - b;
      });

      if (sortingOrder === "DSC") {
        _data = _data.slice().reverse();
      }
    }

    if (currentPage) {
      _data = getPaginatedData(_data);
    }
    return _data;
  }

  const renderTable = () => {
    console.log({ sortingOrder, sortingColumn });
    table.innerHTML = "";
    createTableHead(table, columns);
    createTableBody(table, columns, resolveData());
    tableContainer.appendChild(table);
    return tableContainer;
  };

  tableContainer.appendChild(createActionBar());

  return renderTable();
}

export default Table;
