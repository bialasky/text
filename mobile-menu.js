function mobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const sidebar = document.querySelector(".sidebar-header");

  mobileMenuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  return () => {
    mobileMenuBtn.removeEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  };
}

export default mobileMenu;
