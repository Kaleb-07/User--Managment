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
