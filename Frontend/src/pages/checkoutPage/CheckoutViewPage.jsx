import React, { useContext, useEffect, useState } from "react";
import PaymentCheckout from "./CheckoutPaymentPage";
import { useParams, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import NoUserPlan from "./NoUserPlan";
import CheckOutNotFoundPage from "./CheckoutNotFoundPage";
import { motion } from "framer-motion";

const CheckoutViewPage = () => {
  const { backendUrl } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentViewPaymentForm, setCurrentViewPaymentForm] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [userPlanName, setUserPlanName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCheckedUserPlan, setHasCheckedUserPlan] = useState(false);
  const [isValidPayment, setIsValidPayment] = useState(true);

  const checkPaidUserOrNot = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/customer/checkout/user-plan/${id}`
      );

      if (data.success) {
        setUserPlanName(data.userPlanName);
        setUserPlan(data.userPlan);
      } else {
        setUserPlanName(null);
        setUserPlan(null);
      }
    } catch (error) {
      console.log(error.message);
      setUserPlanName(null);
      setUserPlan(null);
    } finally {
      setHasCheckedUserPlan(true);
    }
  };

  useEffect(() => {
    const fetchUserPaymentForm = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${backendUrl}/customer/checkout/payment/${id}`
        );

        if (data.success) {
          setCurrentViewPaymentForm(data.checkoutForm);
          await checkPaidUserOrNot();
        } else {
          setIsValidPayment(false);
          toast.error("Payment link is invalid");
          navigate("/404", { replace: true });
        }
      } catch (error) {
        setIsValidPayment(false);
        toast.error(error.message);
        navigate("/404", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPaymentForm();
  }, [id, backendUrl, navigate]);

  if (!isValidPayment) {
    return <CheckOutNotFoundPage />;
  }

  if (isLoading || !hasCheckedUserPlan) {
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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {userPlan && userPlanName !== "no-plan" ? (
        <PaymentCheckout paymentForm={currentViewPaymentForm} />
      ) : (
        <NoUserPlan />
      )}
    </motion.div>
  );
};

export default CheckoutViewPage;
