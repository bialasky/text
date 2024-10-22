const createAccordion = () => {
  const elements = {
    tabButtons: document.querySelectorAll(".tab-btn"),
    faqItems: document.querySelectorAll(".faq-item"),
    faqList: document.querySelector(".faq-list"),
    allFaqItems: Array.from(document.querySelectorAll(".faq-item")),
  };

  const handleTabClick = (e) => {
    elements.tabButtons.forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");

    const category = e.target.textContent.trim();
    filterFAQs(category);
  };

  const filterFAQs = (category) => {
    if (!elements.faqList) return;
    elements.faqList.innerHTML = "";

    const itemsToShow =
      category === "All"
        ? elements.allFaqItems
        : elements.allFaqItems.filter(
            (item) => item.getAttribute("data-category") === category
          );

    itemsToShow.forEach((item) => {
      elements.faqList.appendChild(item.cloneNode(true));
    });

    attachFAQClickHandlers();
  };

  const handleFAQClick = (e) => {
    const faqItem = e.currentTarget.closest(".faq-item");
    if (!faqItem) return;

    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("open");
      }
    });

    faqItem.classList.toggle("open");
  };

  const attachFAQClickHandlers = () => {
    document.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", handleFAQClick);
    });
  };

  const init = () => {
    elements.tabButtons.forEach((button) => {
      button.addEventListener("click", handleTabClick);
    });

    attachFAQClickHandlers();

    return () => {
      elements.tabButtons.forEach((button) => {
        button.removeEventListener("click", handleTabClick);
      });

      document.querySelectorAll(".faq-question").forEach((question) => {
        question.removeEventListener("click", handleFAQClick);
      });
    };
  };

  return init();
};

export default createAccordion;
