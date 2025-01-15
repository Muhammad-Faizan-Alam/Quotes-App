import axios from 'axios';

export const fetchAuthors = async () => {
  try {
    const response = await axios.get('https://mocki.io/v1/735a8c66-ff34-4099-bb0d-92668c57f384');
    return response.data; // Ensure you return the correct data
  } catch (error) {
    throw new Error('Failed to fetch authors data: ' + error.message);
  }
};