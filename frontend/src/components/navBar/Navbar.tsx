import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import NavLogo from "assets/images/DAMORI_navBar.svg";
import UserDummy from "assets/images/UserDummy.svg";
import Badge from "assets/images/RewardBadge.svg";

function NavBar() {
  const [dropDown, setdropDown] = useState(false);
  const [active, setActive] = useState("대회");

  return (
<<<<<<< HEAD
    <AppBar position="sticky"  style={{ background: '#1C1C1C' }} >
      <Container maxWidth="xl" style={{ width: 800 }}>
        <Toolbar disableGutters >
          {/* DAEMORI LOGO */}
          <Link style={{textDecoration: "none"}} to={`/`}  >
            <img src={DAMORI_navBar} alt="DAMORI_navBar" width={180} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              {/* Side Menu icon */}
              <MenuIcon  />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.text} onClick={handleCloseNavMenu}>
                  <Link style={{textDecoration: "none"}} to={`/${page.href}`}>{page.text}</Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.text} style={{textDecoration: "none"}} to={`/${page.href}`}>
              <Button
                key={page.text}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
=======
    <div id="navbar">
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-content-logo">
            <img className="navbar-logo" src={NavLogo} alt="" />
          </div>
          <div className="navbar-content-tap">
            <div className="navbar-content-tap-menu">
              <Link
                className={active === "대회" ? "active" : ""}
                to="leagues"
                onClick={() => setActive("대회")}
>>>>>>> f10013d3721fce0c4080b972afc7a2e42c580de0
              >
                대회
              </Link>
<<<<<<< HEAD
            ))}
          </Box>
          
          {/* Profile 영역(Box~BoX) */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <Link key={setting} style={{textDecoration: "none"}} to={`/${setting}`}>
                  <MenuItem  onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
=======
              <Link
                className={active === "랭킹" ? "active" : ""}
                onClick={() => setActive("랭킹")}
                to="rankings"
              >
                랭킹
              </Link>
              <Link
                className={active === "대학" ? "active" : ""}
                onClick={() => setActive("대학")}
                to="university"
              >
                대학
              </Link>
            </div>
            {/* <div className="navbar-content-tap-login">
              <Link to="login">로그인</Link>
            </div> */}
            <div className="navbar-content-tap-profile">
              <div>닉네임은팔글자임</div>
              <div className="badge-container">
                <img src={Badge} alt="school-icon" />
              </div>
              <div className="profile-container">
                <button type="button" onClick={() => setdropDown(!dropDown)}>
                  <img src={UserDummy} alt="dummy" />
                </button>
              </div>
              {dropDown && (
                <div className="profile-dropdown">
                  <Link onClick={() => setActive("")} to="mypage">
                    마이페이지
                  </Link>
                  <Link onClick={() => setActive("")} to="mypage">
                    회원정보수정
                  </Link>
                  <Link onClick={() => setActive("")} to="login">
                    로그아웃
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
>>>>>>> f10013d3721fce0c4080b972afc7a2e42c580de0
  );
}

export default NavBar;
