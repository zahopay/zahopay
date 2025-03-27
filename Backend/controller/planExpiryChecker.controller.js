import userModel from "../model/user.model.js";
import { sendPlanExpiryEmail } from "../config/userPlanEmailService.js";
import cron from "node-cron";

const checkExpiredPlans = async () => {
  try {
    const now = new Date();
    console.log(`[${now.toISOString()}] Checking for expired plans...`);

    // Find users with expired plans who haven't been notified yet
    const users = await userModel.find({
      userPlan: { $ne: "no-plan" },
      userPlanExpire: { $lte: now },
      planExpiryNotified: { $ne: true }, 
    });

    if (users.length === 0) {
      console.log("No expired plans found");
      return;
    }

    console.log(`Found ${users.length} users with expired plans`);

    // Update each expired plan
    for (const user of users) {
      try {
        // Update user plan to expired
        const updates = {
          userPlan: "no-plan",
          userPlanExpire: null,
          isUserPlan: false,
          planExpiryNotified: true,
        };

        // Use findByIdAndUpdate for atomic operation
        await userModel.findByIdAndUpdate(user._id, updates);

        // Send notification email
        await sendPlanExpiryEmail(user.email, user.name);

        console.log(`Updated expired plan for user: ${user.email}`);
      } catch (userError) {
        console.error(`Error updating user ${user.email}:`, userError);
        // Consider adding retry logic or dead-letter queue for failed updates
      }
    }

    console.log("Finished processing expired plans");
  } catch (error) {
    console.error("Error in checkExpiredPlans:", error);
    // Consider adding notification for admin about cron job failures
  }
};

// Schedule the cron job to run daily at midnight
const startPlanExpiryCron = () => {
  // Run every day at 00:00
  const job = cron.schedule("0 0 * * *", checkExpiredPlans, {
    scheduled: true,
    timezone: "Asia/Kolkata",
  });

  console.log("Plan expiry checker cron job scheduled");

  // For graceful shutdown
  process.on("SIGTERM", () => {
    job.stop();
    console.log("Plan expiry cron job stopped");
  });

  process.on("SIGINT", () => {
    job.stop();
    console.log("Plan expiry cron job stopped");
  });

  return job;
};

export default startPlanExpiryCron;
