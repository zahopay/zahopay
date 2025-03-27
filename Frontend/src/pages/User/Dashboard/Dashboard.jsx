import React, { useContext, useEffect, useState } from 'react'
import { CiLogout } from "react-icons/ci";
import AppContext from '../../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { motion } from "framer-motion";
import { CheckCircle, Mail, MessageSquare, Layout, Zap } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import moment from "moment";
import Button from '../../../components/Button';



const Dashboard = () => {

  const {logout, backendUrl} = useContext(AppContext)

  const [totalPaymentForm, setTotalPaymentForm] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [formSoldThisWeek, setFormSoldThisWeek] = useState(null);
  const [revenueThisWeek, setRevenueThisWeek] = useState(null);

   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(false);

  //graph

  const [statTotalRevenue, setStatTotalRevenue] = useState(null);
  const [statTotalPurchase, setStatTotalPurchase] = useState(null);


    const [filter, setFilter] = useState("7days");
    const [chartData, setChartData] = useState([]);

      

  useEffect(() => {
    const fetchStatistics = async() => {
      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(
          `${backendUrl}/user/dashboard/get-user-statistics?filter=${filter}`
        );

        if (data.success) {
          setStatTotalRevenue(data.totalRevenue);
          setStatTotalPurchase(data.totalSales);

          generateChartData(filter, data.purchases || []);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchStatistics()
  }, [filter])


  useEffect(() => {
    const fetchTotalPaymentForm = async() => {
      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(
          backendUrl + "/user/dashboard/get-user-payment-form-count"
        );

        if(data.success){
          setTotalPaymentForm(data.totalPaymentFormCount);
        }else{
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    fetchTotalPaymentForm()
  }, [])

    useEffect(() => {
      const fetchTotalRevenue = async () => {
        try {
          axios.defaults.withCredentials = true;

          const { data } = await axios.get(
            backendUrl + "/user/dashboard/get-user-total-revenue"
          );

          if (data.success) {
            setTotalRevenue(data.totalrevenue);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

      fetchTotalRevenue();
    }, []);

      useEffect(() => {
        const fetchTotalWeekRevenue = async () => {
          try {
            axios.defaults.withCredentials = true;

            const { data } = await axios.get(
              backendUrl + "/user/dashboard/get-user-week-revenue"
            );

            if (data.success) {
              setRevenueThisWeek(data.totalweekrevenue);
            } else {
              toast.error(data.message);
            }
          } catch (error) {
            toast.error(error.message);
          }
        };

        fetchTotalWeekRevenue();
      }, []);


    useEffect(() => {
      const fetchTotalWeekFormSold = async () => {
        try {
          axios.defaults.withCredentials = true;

          const { data } = await axios.get(
            backendUrl + "/user/dashboard/get-user-week-form-sold-count"
          );

          if (data.success) {
            setFormSoldThisWeek(data.purchaseCountThisWeek);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };

      fetchTotalWeekFormSold();
    }, []);

    const generateChartData = (filter, purchases) => {
      let data = [];

      if (filter === "today") {
        // Group by hour for today
        const hours = Array.from({ length: 24 }, (_, i) => i);
        data = hours.map((hour) => {
          const hourPurchases = purchases.filter(
            (p) => moment(p.createdAt).hour() === hour
          );
          return {
            date: `${hour}:00`,
            sales: hourPurchases.length,
            revenue: hourPurchases.reduce((sum, p) => sum + p.price, 0),
          };
        });
      } else if (filter === "yesterday") {
        // Similar to today but for yesterday
        const hours = Array.from({ length: 24 }, (_, i) => i);
        data = hours.map((hour) => {
          const hourPurchases = purchases.filter(
            (p) => moment(p.createdAt).hour() === hour
          );
          return {
            date: `${hour}:00`,
            sales: hourPurchases.length,
            revenue: hourPurchases.reduce((sum, p) => sum + p.price, 0),
          };
        });
      } else if (filter === "7days") {
        // Group by day for last 7 days
        data = Array.from({ length: 7 }, (_, i) => {
          const day = moment().subtract(6 - i, "days");
          const dayPurchases = purchases.filter((p) =>
            moment(p.createdAt).isSame(day, "day")
          );
          return {
            date: day.format("MMM D"),
            sales: dayPurchases.length,
            revenue: dayPurchases.reduce((sum, p) => sum + p.price, 0),
          };
        });
      } else if (filter === "30days") {
        // Group by week for last 30 days (4 weeks)
        data = Array.from({ length: 4 }, (_, i) => {
          const weekStart = moment()
            .subtract(4 - i, "weeks")
            .startOf("week");
          const weekEnd = moment()
            .subtract(4 - i, "weeks")
            .endOf("week");
          const weekPurchases = purchases.filter((p) =>
            moment(p.createdAt).isBetween(weekStart, weekEnd)
          );
          return {
            date: `Week ${i + 1}`,
            sales: weekPurchases.length,
            revenue: weekPurchases.reduce((sum, p) => sum + p.price, 0),
          };
        });
      }

      setChartData(data);
    };



  return (
    <div className="px-2 md:px-4 lg:px-6">
      {/* Header */}
      <div className="my-3 md:my-5 flex justify-between items-center">
        <div></div>
        <div
          className="flex items-center gap-2 border-gray-500 border-2 cursor-pointer px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-purple-300 transition-all duration-300"
          onClick={logout}
        >
          <CiLogout className="text-black text-2xl md:text-3xl" />
          <span className="hidden sm:inline">Logout</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="bg-white p-3 md:p-6 rounded-md shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {/* Total Products Created */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 p-4 md:p-6 rounded-lg flex flex-col items-start gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
              {totalPaymentForm ?? "-"}
            </h1>
            <h1 className="text-gray-600 text-sm md:text-lg">Total Products</h1>
          </div>

          {/* Total Revenue */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 p-4 md:p-6 rounded-lg flex flex-col items-start gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
              ₹{totalRevenue ?? "-"}
            </h1>
            <h1 className="text-gray-600 text-sm md:text-lg">Total Revenue</h1>
          </div>

          {/* Pages Sold This Week */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 p-4 md:p-6 rounded-lg flex flex-col items-start gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
              {formSoldThisWeek ?? "-"}
            </h1>
            <h1 className="text-gray-600 text-sm md:text-lg">Sold This Week</h1>
          </div>

          {/* Revenue This Week */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 p-4 md:p-6 rounded-lg flex flex-col items-start gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-purple-800">
              ₹{revenueThisWeek ?? "-"}
            </h1>
            <h1 className="text-gray-600 text-sm md:text-lg">Weekly Revenue</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row justify-between my-3 md:my-5 gap-3 md:gap-5">
        {/* Chart Section */}
        <div className="bg-white shadow-lg rounded-xl p-4 md:p-6 w-full">
          <h2 className="text-lg font-bold text-gray-800 mb-3 md:mb-4">
            📊 Sales & Revenue
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
            {["today", "yesterday", "7days", "30days"].map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs md:text-sm md:px-4 md:py-2 rounded-md ${
                  filter === f
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {f === "today"
                  ? "Today"
                  : f === "yesterday"
                  ? "Yesterday"
                  : f === "7days"
                  ? "7 Days"
                  : "30 Days"}
              </Button>
            ))}
          </div>

          {/* Chart */}
          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-500">
              No data available
            </div>
          ) : (
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: isMobile ? 10 : 12 }}
                  />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#8884d8"
                    name="Total Sales"
                    strokeWidth={2}
                    activeDot={{ r: isMobile ? 4 : 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#82ca9d"
                    name="Total Revenue"
                    strokeWidth={2}
                    activeDot={{ r: isMobile ? 4 : 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Coming Soon Section - Hidden on mobile */}
        {!isMobile && (
          <motion.div
            className="w-full lg:w-1/3 xl:w-1/4 bg-gradient-to-r from-purple-500 to-indigo-600 shadow-xl rounded-2xl p-4 md:p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-3 md:mb-4"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Zap className="text-yellow-300 animate-pulse" /> Coming Soon 🔜
            </motion.h1>

            <ul className="space-y-2 md:space-y-3">
              <motion.li
                className="flex items-center gap-2 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
              >
                <Layout className="text-yellow-300" /> New Theme
              </motion.li>
              <motion.li
                className="flex items-center gap-2 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
              >
                <CheckCircle className="text-green-300" /> Advertise Banner
              </motion.li>
              <motion.li
                className="flex items-center gap-2 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
              >
                <MessageSquare className="text-blue-300" /> WhatsApp Automation
              </motion.li>
              <motion.li
                className="flex items-center gap-2 text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="text-red-300" /> Order Emails
              </motion.li>
            </ul>

            <motion.p
              className="mt-4 md:mt-6 text-center text-xs md:text-sm font-semibold bg-white/20 py-1 px-2 md:py-2 md:px-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              🔥 Exclusive to{" "}
              <span className="text-yellow-300">Enterprise</span> 🔥
            </motion.p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Dashboard
