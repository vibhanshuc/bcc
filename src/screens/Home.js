import Table from "../components/Table";
import data from "../data";
import './Home.css';

function HomeScreen() {
  const container = document.createElement("section");
  container.classList.add("home");
  const table = Table({
    columns: [
      {
        label: "ID",
        accessor: "id",
        sortable: true,
        render(cellData) {
          const button = document.createElement("button");
          button.innerText = cellData.id;
          return button;
        },
      },
      {
        label: "Full Name",
        isSearchable: true,
        accessor: 'preferredFullName',
      },
      {
        label: "Employee Code",
        isSearchable: true,
        accessor: "employeeCode",
      },
      {
        label: "Job Title",
        accessor: "jobTitleName",
      },
      {
        label: "Phone Number",
        accessor: "phoneNumber",
      },
      {
        label: "Email ID",
        accessor: "emailAddress",
      },
      {
        label: "Region",
        accessor: "region",
      },
      {
        label: "DOB",
        accessor: "dob",
      },
      {
        label: "",
        render(cellData) {
          const button = document.createElement("button");
          button.innerText = "...";
          return button;
        },
      },
    ],
    data,
    config: {
      fixed: true
    }
  });
  container.appendChild(table);
  return container;
}

export default HomeScreen;
