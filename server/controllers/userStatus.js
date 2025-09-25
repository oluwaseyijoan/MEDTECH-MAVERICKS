
const userStatus = (req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(200).json({ loggedIn: false })
  }

  
  res.json({ loggedIn: true, user: token })
}

const logout = (req,res)=>{
    res.clearCookie("token", {
    httpOnly: true,
    secure: false, 
    sameSite: "strict",
    path: "/",
  })
  res.json({ message: "Logged out successfully" })

}
module.exports = {userStatus,logout}
