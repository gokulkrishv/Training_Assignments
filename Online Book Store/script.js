let users = [];
let currentUser  = null;

// Sample books data
const booksData = {
    "Fiction": ["The Great Gatsby", "To Kill a Mockingbird", "1984"],
    "Non-Fiction": ["Sapiens", "Educated", "Becoming"],
    "Novels": ["Pride and Prejudice", "The Catcher in the Rye", "The Alchemist"],
    "Kids Education": ["The Very Hungry Caterpillar", "Goodnight Moon", "Where the Wild Things Are"],
    "Science": ["A Brief History of Time", "The Selfish Gene", "Cosmos"],
    "Technology": ["The Innovators", "The Code Book", "How We Got to Now"],
    "Magazines": ["National Geographic", "TIME", "The Economist"]
};

// Registration form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const email = document.getElementById('email').value;
    const categories = Array.from(document.getElementById('categories').selectedOptions).map(option => option.value);

    if (age < 10 || age > 80) {
        alert("Age must be between 10 and 80 years.");
    } else {
        // Proceed with registration logic
        users.push({ name, age, email, categories });
        alert("Registration successful!");
        // Clear the form
        document.getElementById('registrationForm').reset();
        // Show the login form after registration
        document.getElementById('registration').style.display = 'none';
        document.getElementById('login').style.display = 'block';
    }
});

// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    currentUser  = users.find(user => user.email === email);
    
    if (currentUser ) {
        alert(`Welcome back, ${currentUser .name}!`);
        displayBooks();
    } else {
        alert("User  not found. Please register.");
    }
});

// Function to display books based on selected categories
function displayBooks() {
    const booksContainer = document.getElementById('books');
    booksContainer.innerHTML = ''; // Clear previous books

    currentUser .categories.forEach(category => {
        const books = booksData[category];
        if (books) {
            books.forEach(book => {
                const bookElement = document.createElement('div');
                bookElement.className = 'col-md-4 mb-3';
                bookElement.innerHTML = `<div class="card">
                                            <div class="card-body">
                                                <h5 class="card-title">${book}</h5>
                                            </div>
                                        </div>`;
                booksContainer.appendChild(bookElement);
            });
        }
    });

    // Hide login form and show book display section
    document.getElementById('login').style.display = 'none';
    document.getElementById('bookDisplay').style.display = 'block';
}