function fetchAndPopulateTable() {
    console.log("asdasd")
    fetch('http://localhost:5001/api/v1/movie/list')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const tableBody = document.querySelector('#movie-table tbody');
            tableBody.innerHTML = '';

            data.forEach(movie => {
                const row = document.createElement('tr');
                row.innerHTML = `
          <td>${movie.name}</td>
          <td>${movie.rating}</td>
          <td>${movie.genre}</td>
          <td>${movie.releaseDate}</td>
          <td>
            <a class="edit" href="#">Edit</a>
            <a class="delete" href="#">Delete</a>
          </td>
        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


function logout() {
    // Implement your logout logic here, e.g., clearing session data or redirecting.
    alert('Logout function goes here');
}