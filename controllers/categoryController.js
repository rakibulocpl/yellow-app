const Categories = require("../models/categories");

const getCategories = async (req, res) => {
    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    if (page < 1 || limit < 1) {
        return res.status(400).json({
            status: "error",
            message: "Page and limit must be greater than 0",
            status_code: 400,
        });
    }
    const offset = (page - 1) * limit;

    try {
        const categories = await Categories.getCategories(offset, limit);
        return res.status(200).json({
            status: "success",
            message: "Category retrieved successfully",
            status_code: 200,
            data: {
                page,
                limit,
                categories,
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

const searchCategory = async (req, res) => {
    let { search,limit } = req.query;
    limit = parseInt(limit) || 10;
    if ( limit < 1) {
        return res.status(400).json({
            status: "error",
            message: "limit must be greater than 0",
            status_code: 400,
        });
    }

    try {
        const categories = await Categories.searchCategory(search, limit);
        return res.status(200).json({
            status: "success",
            message: "Category retrieved successfully",
            status_code: 200,
            data: {
                search,
                limit,
                categories,
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
    getCategories,
    searchCategory
};