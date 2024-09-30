import axios from "axios";

const API_URL = "https://freetestapi.com/api/v1/books";

export const fetchBooks = async (query = "") => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        search: query,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
