import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import {motion} from "framer-motion"


const ProtectedRoute = () => {
  const { setUserData, authState, setAuthState, backendUrl } = useContext(AppContext);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      setAuthState((prevState) => ({ ...prevState, isLoading: true })); // Set loading to true
      try {
        const response = await axios.get(`${backendUrl}/api/auth/is-auth`, {
          withCredentials: true,
        });

        if (response.data.success) {
          try {
            const userDataResponse = await axios.get(
              `${backendUrl}/api/user/data`,
              { withCredentials: true }
            );

            if (userDataResponse.data.success) {
              setAuthState({
                isLoggedin: true,
                isLoading: false,
                userData: userDataResponse.data.userDetials,
              });
              setUserData(userDataResponse.data.userDetials);
            } else {
              setAuthState({ ...authState, isLoading: false });
              navigate("/login");
            }
          } catch (userDataError) {
            setAuthState({ ...authState, isLoading: false });
            navigate("/login");
          }
        } else {
          setAuthState({ ...authState, isLoading: false });
          navigate("/login");
        }
      } catch (error) {
        setAuthState({ ...authState, isLoading: false });
        navigate("/login");
      }
      setAuthChecked(true);
    };

    checkAuth();
  }, [navigate, backendUrl, setAuthState, setUserData, authState]);

  if (!authChecked) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen min-w-full bg-white flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 border-t-4 border-b-4 border-purple-500 rounded-full"
        ></motion.div>
      </motion.div>
    );
  }

  return authState.isLoggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
