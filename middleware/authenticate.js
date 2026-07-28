const isAuthenticated = (req, res, next) => {
    console.log("=== AUTH MIDDLEWARE ===");
    console.log("Session:", req.session);
    console.log("User:", req.session.user);

    if (req.session.user === undefined) {
        return res.status(401).json("You do not have access.");
    }

    next();
};

module.exports = {
    isAuthenticated
};