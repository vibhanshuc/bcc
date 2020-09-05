
function setAttributes(el, attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
        el.setAttribute(key, attrs[key]);
    });
}

const createElementAndApplyAttrs = (
    elementTag,
    elementContent,
    attributes = {}
) => {
    const el = document.createElement(elementTag);
    setAttributes(el, attributes);
    if (typeof elementContent === "string") {
        el.innerText = elementContent;
    } else {
        el.appendChild(elementContent);
    }
    return el;
};
