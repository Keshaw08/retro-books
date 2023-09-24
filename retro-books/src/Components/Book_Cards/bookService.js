// bookService.js
const fetchBooks = async () => {
    try {
      const response = await fetch('get-books'); // Assuming your API endpoint is '/api/books'
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  };
  
  module.exports = { fetchBooks };
  