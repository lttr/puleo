// const rootStyles = window.getComputedStyle(document.documentElement)
const propElements = document.querySelectorAll("section.sample article code")
const cssIndex = Object.fromEntries(getCSSCustomPropIndex())

for (const propElement of propElements) {
  const propName = propElement.textContent.trim()
  // const rootValue = rootStyles.getPropertyValue(propName)

  const exampleElement = propElement.parentNode.querySelector(".example")
  let elementStyle = ""
  let cssProperty = ""
  if (exampleElement) {
    const elementStyles = window.getComputedStyle(exampleElement)
    cssProperty = exampleElement.closest("[data-property]")?.dataset["property"]
    elementStyle = elementStyles[cssProperty]
  }

  const propString = cssIndex[propName]
  const valueHTML = `
<code class="value" title="Given custom property value: ${propString}">${propString}</code>
<code class="value" title="Computed value of property '${cssProperty}': ${elementStyle}">${cssProperty} = ${elementStyle}</code>
  `
  propElement.insertAdjacentHTML("afterend", valueHTML)
}

/** Source: https://css-tricks.com/how-to-get-all-custom-properties-on-a-page-in-javascript/ */
function getCSSCustomPropIndex() {
  const isSameDomain = (styleSheet) => {
    if (!styleSheet.href) {
      return true
    }

    return styleSheet.href.indexOf(window.location.origin) === 0
  }

  const isStyleRule = (rule) => rule.type === 1

  return Array.from(document.styleSheets)
    .filter(isSameDomain)
    .reduce(
      (finalArr, sheet) =>
        finalArr.concat(
          [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
            const props = [...rule.style]
              .map((propName) => [
                propName.trim(),
                rule.style.getPropertyValue(propName).trim(),
              ])
              .filter(([propName]) => propName.indexOf("--") === 0)

            return [...propValArr, ...props]
          }, []),
        ),
      [],
    )
}

// Anchors

const toc = document.getElementById("toc")
document.querySelectorAll("section.sample > h2").forEach((heading) => {
  const text = heading.textContent
  const anchor = `<div id="${text}" class="anchor">
      <h2>${text}</h2>
      <a
        href="#${text}"
        class="anchor-link"
        aria-label="Link to section ${text}"
        ><span aria-hidden="true">#</span></a
      >
    </div>`
  heading.outerHTML = anchor
  toc.insertAdjacentHTML(
    "beforeend",
    `<li class="p-secondary-text-regular"><a href="#${text}">${text}</li>`,
  )
})

// Dialog

const dialog = document.querySelector("dialog")
const showButton = document.querySelector("dialog + button")
const closeButton = document.querySelector("dialog button")

showButton.addEventListener("click", () => {
  dialog.showModal()
})

closeButton.addEventListener("click", () => {
  dialog.close()
})
