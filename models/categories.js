const db = require("./db");

const Categories = {
    getCategories: async (offset = 0, limit = 10) => {
        const sql = `
      SELECT id, category_name, description 
      FROM categories 
      WHERE parent_id IS NULL 
      ORDER BY category_name ASC
      LIMIT ? OFFSET ?
    `;

        try {
            return await db.query(sql, [limit, offset]);
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },

    searchCategory: async (search = "", limit = 10) => {
        const sql = `
      SELECT 
        c1.id AS parent_id, 
        c1.category_name AS parent_name, 
        c1.description AS parent_description, 
        c2.id AS child_id,
        c2.category_name AS child_name,
        c2.description AS child_description
      FROM categories c1
      LEFT JOIN categories c2 ON c1.id = c2.parent_id
      WHERE c1.category_name LIKE ?
      ORDER BY c1.category_name ASC
      LIMIT ?;
    `;

        const searchTerm = `%${search}%`;

        try {
            const results = await db.query(sql, [searchTerm, limit]);

            const categories = [];
            let currentParent = null;

            results.forEach(row => {
                if (!currentParent || currentParent.parent_id !== row.parent_id) {
                    currentParent = {
                        id: row.parent_id,
                        category_name: row.parent_name,
                        description: row.parent_description,
                        children: []
                    };
                    categories.push(currentParent);
                }

                if (row.child_id) {
                    currentParent.children.push({
                        id: row.child_id,
                        category_name: row.child_name,
                        description: row.child_description
                    });
                }
            });

            return categories;
        } catch (error) {
            console.error("Error searching categories:", error);
            throw error;
        }
    }
};

module.exports = Categories;
