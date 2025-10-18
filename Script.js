   // Hide all sections except the selected one
    function displayForm(showId) {
      const sections = ['newSection', 'listSection', 'editSection', 'deleteSection'];
      sections.forEach(id => {
        document.getElementById(id).style.display = (id === showId) ? 'flex' : 'none';
      });
    }
        // Example: Fetch list from backend (GET /list)
    async function fetchList() {
      const res = await fetch("http://localhost:3000/list");
      const data = await res.json();
      let html = "<table border='1' width='100%'><tr><th>ID</th><th>Name</th><th>Address</th><th>Company</th></tr>";

      data.forEach(row => {
        html += `<tr>
          <td>${row.customer_id}</td>
          <td>${row.name}</td>
          <td>${row.address}</td>
          <td>${row.company}</td>
        </tr>`;
      });

      html += "</table>";
      document.getElementById("listResult").innerHTML = html;
    }
        // edit 
    document.getElementById("editForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent page refresh

const id = document.getElementById("editId").value;
  const payload = {
    name: document.getElementById("editName").value,
    address: document.getElementById("editAddress").value,
    company: document.getElementById("editCompany").value,
  };

  const res = await fetch(`http://localhost:3000/edit/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.text(); // can be success message
  alert(data);
    // Optionally refresh the list
  fetchList();
});

  // Delete
  document.getElementById("deleteForm").addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent default form submission

  const id = document.getElementById("deleteId").value;

  // Send POST request to delete user
  const res = await fetch("http://localhost:3000/deleteuser", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }) // send ID as JSON
  });
    const data = await res.text();
  alert(data);

  // Optionally refresh the list after deletion
  fetchList(); // assumes you have fetchList() to update your table
});