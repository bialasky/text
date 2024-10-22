function accordion() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const faqItems = document.querySelectorAll(".faq-item");
  const faqList = document.querySelector(".faq-list");

  const allFaqItems = Array.from(faqItems);

  function handleTabClick(e) {
    tabButtons.forEach((btn) => btn.classList.remove("active"));

    e.target.classList.add("active");

    const category = e.target.textContent.trim();
    filterFAQs(category);
  }

  function filterFAQs(category) {
    faqList.innerHTML = "";

    if (category === "All") {
      allFaqItems.forEach((item) => {
        faqList.appendChild(item.cloneNode(true));
      });
    } else {
      const filteredItems = allFaqItems.filter((item) => {
        return item.getAttribute("data-category") === category;
      });

      filteredItems.forEach((item) => {
        faqList.appendChild(item.cloneNode(true));
      });
    }

    attachFAQClickHandlers();
  }

  function handleFAQClick(e) {
    const faqItem = e.currentTarget.closest(".faq-item");

    const allItems = document.querySelectorAll(".faq-item");
    allItems.forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("open");
      }
    });

    faqItem.classList.toggle("open");
  }

  function attachFAQClickHandlers() {
    const questions = document.querySelectorAll(".faq-question");
    questions.forEach((question) => {
      question.addEventListener("click", handleFAQClick);
    });
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", handleTabClick);
  });

  // Initial setup
  attachFAQClickHandlers();
}

export default accordion;
