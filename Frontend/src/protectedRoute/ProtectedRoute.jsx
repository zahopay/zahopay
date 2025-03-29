import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AppContext from "../context/AppContext";
import {motion} from "framer-motion"


const ProtectedRoute = () => {
  const { userData, authState, setAuthState , verifyAuth } = useContext(AppContext);

  const [authChecked, setAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/auth/is-auth`,
                    { withCredentials: true }
                );

                if (response.data.success) {
                    setAuthState({
                        isLoggedin: true,
                        userData: response.data.admin,
                        isLoading: false,
                    });
                } else {
                    navigate('/login');
                }
            } catch (error) {
                navigate('/login');
            }
            setAuthChecked(true);
        };

        checkAuth();
    }, [navigate, backendUrl, setAuthState]);

if (!authChecked) {
  return  (
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
