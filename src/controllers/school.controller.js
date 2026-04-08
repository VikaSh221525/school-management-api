const db = require("../db/db");

// Helper: Haversine formula to calculate distance between two coordinates
function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Controller: Add a new school
const addSchool = async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    // Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
        return res
            .status(400)
            .json({ error: "Name is required and must be a non-empty string." });
    }
    if (!address || typeof address !== "string" || address.trim() === "") {
        return res
            .status(400)
            .json({ error: "Address is required and must be a non-empty string." });
    }
    if (latitude === undefined || isNaN(parseFloat(latitude))) {
        return res
            .status(400)
            .json({ error: "Latitude is required and must be a number." });
    }
    if (longitude === undefined || isNaN(parseFloat(longitude))) {
        return res
            .status(400)
            .json({ error: "Longitude is required and must be a number." });
    }

    try {
        const sql =
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
        const [result] = await db.execute(sql, [
            name.trim(),
            address.trim(),
            parseFloat(latitude),
            parseFloat(longitude),
        ]);

        res.status(201).json({
            message: "School added successfully!",
            schoolId: result.insertId,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error. Could not add school." });
    }
};

// Controller: List all schools sorted by distance
const listSchools = async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || isNaN(parseFloat(latitude))) {
        return res
            .status(400)
            .json({
                error: 'Query param "latitude" is required and must be a number.',
            });
    }
    if (!longitude || isNaN(parseFloat(longitude))) {
        return res
            .status(400)
            .json({
                error: 'Query param "longitude" is required and must be a number.',
            });
    }

    try {
        const [schools] = await db.execute("SELECT * FROM schools");

        const schoolsWithDistance = schools.map((school) => ({
            ...school,
            distance_km: parseFloat(
                getDistance(
                    parseFloat(latitude),
                    parseFloat(longitude),
                    school.latitude,
                    school.longitude,
                ).toFixed(2),
            ),
        }));

        schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

        res.status(200).json({
            message: "Schools fetched successfully.",
            count: schoolsWithDistance.length,
            schools: schoolsWithDistance,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error. Could not fetch schools." });
    }
};

module.exports = { addSchool, listSchools };
