document.addEventListener("DOMContentLoaded", () => {
    const deleteBtn = document.getElementById("delete-account");
    const statusEl = document.getElementById("status");

    if (deleteBtn && statusEl) {
        deleteBtn.addEventListener("click", () => {
            statusEl.textContent = "Account deletion action triggered.";
        });
    }
});
