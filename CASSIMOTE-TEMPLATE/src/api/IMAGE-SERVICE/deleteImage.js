import axios from "axios";

const deleteImage = async (url) => {
  try {
    const response = await axios.post(
      'http://192.168.0.25:4000/graphql',
      {
        query: `
          mutation($url: String!) {
            deleteImage(url: $url)
          }
        `,
        variables: { url }
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return { data: response.data.data.deleteImage };
  } catch (error) {
    throw new Error(error.message);
  }
};

export default deleteImage;
