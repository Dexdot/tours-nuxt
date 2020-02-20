const set = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

export default () => {
  // Initial
  document.documentElement.style.setProperty(
    "--initial-vh",
    `${window.innerHeight * 0.01}px`
  );

  // Resized
  set();
  window.addEventListener("resize", set);
};
