document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }
      document.getElementById("message").innerText = result.message;
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("message").innerText = error.message;
    }
  });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }
    document.getElementById("message").innerText = result.message;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("message").innerText = error.message;
  }
});

document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("updateId").value;
  const username = document.getElementById("updateUsername").value;
  const password = document.getElementById("updatePassword").value;

  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Update failed");
    }
    document.getElementById("message").innerText = result.message;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("message").innerText = error.message;
  }
});

document.getElementById("deleteForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("deleteId").value;

  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Delete failed");
    }
    document.getElementById("message").innerText = result.message;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("message").innerText = error.message;
  }
});

document.getElementById("fetchUsers").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";
    users.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `ID: ${user.id}, Username: ${user.username}`;
      usersList.appendChild(li);
    });
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("message").innerText = error.message;
  }
});
