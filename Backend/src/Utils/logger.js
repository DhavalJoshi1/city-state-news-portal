const fs = require("fs");
const path = require("path");

const logDir = path.join(__dirname, "../logs");
const logFile = path.join(logDir, "app.log");

// ✅ Folder check: Agar logs folder nahi hai toh bana do
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = (message, type = "INFO") => {
  const logMessage = `[${new Date().toISOString()}] [${type}] - ${message}\n`;

  // 1. Terminal mein dikhane ke liye
  console.log(logMessage.trim());

  // 2. File mein save karne ke liye
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
      // Yahan console.error use karein taaki terminal mein alag dikhe
      console.error("❌ Failed to write to log file:", err.message);
    }
  });
};

module.exports = logger;