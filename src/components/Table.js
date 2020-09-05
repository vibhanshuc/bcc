import "./Table.css";
import ComboBox from "./ComboBox";

function Table({ columns, data, config = {} }) {
  let searchText = "";
  const searchOptions = columns.filter((column) => column.isSearchable);

  let searchOption;

  if (searchOptions.length > 0) {
    searchOption = searchOptions[0].accessor;
  }
  const tableContainer = document.createElement("div");
  tableContainer.classList.add("table__container");
  const table = document.createElement("table");
  table.classList.add("table");

  tableContainer.appendChild(
    ComboBox({
      options: searchOptions.map((option) => ({
        label: option.label,
        value: option.accessor,
      })),
      onChange: handleSearch,
    })
  );

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

  function handleSorting(columnName, order) {
    console.log(columnName)
  }

  function createTableHead(table) {
    const tHead = table.createTHead();
    const tHeadRow = tHead.insertRow();
    tHead.classList.add("table--fixed-header");
    columns.forEach(({ label, accessor, sortable }) => {
      const th = document.createElement("th");
      let text = document.createTextNode(label);
      th.appendChild(text);
      if (sortable) {
        const span = document.createElement("span");
        span.innerHTML = "<i>&#8593;</i>";
        th.addEventListener("click", () => {
          handleSorting(accessor)
        });
        th.appendChild(span);
        console.log(span, th, accessor);
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

  function resolveData() {
    let _data = data;
    if (searchText && searchText.trim() !== "" && searchOption) {
      return _data.filter((item) => {
        return (
          item[searchOption]
            .toString()
            .toLowerCase()
            .indexOf(searchText.trim().toLowerCase()) !== -1
        );
      });
    }
    return _data;
  }

  const renderTable = () => {
    table.innerHTML = "";
    createTableHead(table, columns);
    createTableBody(table, columns, resolveData());
    tableContainer.appendChild(table);
    return tableContainer;
  };
  return renderTable();
}

export default Table;
