import Table from "../components/Table";
import data from "../data";
import "./Home.css";
import Toolbar from "../components/Toolbar";

function HomeScreen() {
  const container = document.createElement("section");
  container.classList.add("home");
  container.appendChild(
    Toolbar({
      title: "Employees",
      buttonText: "Create Employee",
    })
  );
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
        accessor: "preferredFullName",
      },
      {
        label: "Employee Code",
        isSearchable: true,
        accessor: "employeeCode",

        sortable: true,
      },
      {
        label: "Job Title",
        accessor: "jobTitleName",
      },
      {
        label: "Phone Number",
        isSearchable: true,

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
        label: "Actions",
        render(cellData) {
          const button = document.createElement("button");
          button.innerText = "...";
          return button;
        },
      },
    ],
    data,
    config: {
      perPage: 20,
      fixed: true,
    },
  });
  container.appendChild(table);
  return container;
}

export default HomeScreen;
