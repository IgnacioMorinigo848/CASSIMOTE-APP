import { useState, useEffect } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.EXPO_API_URL;

const useGetProfileData = (token) => {
  const [dataProfile, setDataProfile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  const query = `
    query {
  getProfile {
    success
    message
    profile {
      nickName
      email
      profileImage
    }
  }
}
`;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      setLoadingProfile(true);
      try {
        const response = await axios.post(
          API_URL,
          { query },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = response.data.data.getProfile;
        console.log(profileData)
        if (profileData.success) {
            setDataProfile(profileData.profile);
            setErrorProfile(null);
            setIsSuccess(true);
        } else {
            setDataProfile(null);
            setErrorProfile(profileData.message);
            setIsSuccess(true);
        }
      } catch (err) {
        console.error("ERROR en fetchData:", err.message);
        setErrorProfile("Ocurrió un error al cargar los datos.");
        setDataProfile(null);
        setIsSuccess(false);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchData();
  }, [token]);

  return { dataProfile, isSuccess, loadingProfile, errorProfile };
};

export default useGetProfileData;
