const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Impede o envio tradicional

    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Feedback visual durante o envio
    submitButton.textContent = "Enviando...";
    submitButton.disabled = true;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          form.reset(); // Limpa os campos
          // Redireciona para a página de obrigado (opcional)
          window.location.href = form.querySelector(
            'input[name="_next"]',
          ).value;
        } else {
          throw new Error("Erro no servidor");
        }
      })
      .catch(() => {
        alert("Ocorreu um erro. Tente novamente.");
      })
      .finally(() => {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      });
  });
