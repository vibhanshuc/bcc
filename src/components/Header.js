import "./Header.css";

function createHeader() {
  const header = document.createElement("header");
  header.classList.add("header");

  header.innerHTML = `
            <div class="header__title">ABC Bank</div>
            <div class="header__separator"></div>
            <div class="header__sub-title">Bank Control Center</div>
        `;

  return header;
}

export default createHeader;
