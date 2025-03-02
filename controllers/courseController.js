const Courses = require("../models/courses");

const getCourses = async (req, res) => {
  let { page, limit } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  // Validate page and limit
  if (page < 1 || limit < 1) {
    return res.status(400).json({
      status: "error",
      message: "Page and limit must be greater than 0",
      status_code: 400,
    });
  }

  const offset = (page - 1) * limit;

  try {
    const courses = await Courses.getCourses(offset, limit);
    return res.status(200).json({
      status: "success",
      message: "Courses retrieved successfully",
      status_code: 200,
      data: {
        page,
        limit,
        courses,
      },
    });
  } catch (err) {
    console.error("Database query failed:", err);
    return res.status(500).json({
      status: "error",
      message: "Database query failed",
      status_code: 500,
      details: err.message,
    });
  }
};

module.exports = {
  getCourses,
}; 