const authorize = (...roles) => {
  return (req, res, next) => {
    
    if (!req.user) {
      return res.status(401).json({ msg: "Not authenticated" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Permission not granted" });
    }

    next(); 
  };
};

module.exports = { authorize };
