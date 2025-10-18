   // Hide all sections except the selected one
    function displayForm(showId) {
      const sections = ['newSection', 'listSection', 'editSection', 'deleteSection'];
      sections.forEach(id => {
        document.getElementById(id).style.display = (id === showId) ? 'flex' : 'none';
      });
    }
