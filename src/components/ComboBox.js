import './Combobox.css';

function ComboBox({ options, onChange }) {
  let text = "";
  let selectedOption = null;

  function handleTextChange(event) {
    text = event.target.value;
    onChange({
      option: selectedOption,
      text,
    });
  }

  function handleOptionChange(event) {
    selectedOption = event.target.value;
    onChange({
      option: selectedOption,
      text,
    });
  }

  function createCombobox() {
    const container = document.createElement("div");
    const select = document.createElement("select");
    const input = document.createElement("input");
    input.setAttribute('type', 'search');

    options.forEach((option) => {
      const optionEl = document.createElement("option");
      optionEl.innerText = option.label;
      optionEl.setAttribute("value", option.value);
      select.appendChild(optionEl);
    });

    container.appendChild(select);
    container.appendChild(input);

    select.addEventListener("change", handleOptionChange);
    input.addEventListener("change", handleTextChange);
    input.setAttribute('placeholder', 'Press enter to search...')

    input.classList.add('combo__input');
    select.classList.add('combo__select');

    return container;
  }
  return createCombobox();
}

export default ComboBox;
