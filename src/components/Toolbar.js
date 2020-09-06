import "./Toolbar.css";

function Toolbar({
    title = '',
    buttonText = ''
                 } = {}) {
  function createToolbar() {
    const toolbar = document.createElement("div");
    toolbar.classList.add("toolbar");

    toolbar.innerHTML = `
            <div class="toolbar__title">${title}</div>
            <button class="toolbar__button">${buttonText}</button>

        `;

    return toolbar;
  }

  return createToolbar();
}

export default Toolbar;
