const db = require("./db");

const Courses = {
  getCourses: (offset, limit) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT 
    'https://bdskills.gov.bd/course-enroll/' || courses.id AS course_url,
    courses.name AS course_name_en,
    courses.name_bn AS course_name_bn,
    'https://bdskills.gov.bd/lms-web/public/api/org-media/' || courses.org_id || '/logo' AS course_provider_logo,
    courses.course_cost,
    courses.duration,
    organization_details.org_full_name_en AS course_provider_en,
    organization_details.org_full_name_bn AS course_provider_bn
FROM 
    courses
JOIN 
    organization_details ON courses.org_id = organization_details.org_id ORDER BY courses.id DESC LIMIT $1 OFFSET $2`;
      db.query(query, [limit, offset])
        .then(results => resolve(results))
        .catch(err => reject(err));
    });
  },
};

module.exports = Courses;
