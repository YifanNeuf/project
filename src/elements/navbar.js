//打rcc+ENTER
import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../navLink.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { Button } from "react-bootstrap";
import ScrollToTop from "react-scroll-to-top";

import {collection, query, onSnapshot, where} from "firebase/firestore"
import {db} from '../utils/firebase'

export default function NavbarComp() {
  const [user, loading] = useAuthState(auth);
  const [tmp, setTmp] = useState(false)
  // console.log(user);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('email'));
    const q = query(collection(db, 'users'), where('email', '==', userData))
        onSnapshot(q, (querySnapshot) => {
          localStorage.setItem('userData2',JSON.stringify(
            (querySnapshot.docs.map(doc => ({
                  data: doc.data()
              }))
            )
          ))
          setTmp(true);
          // window.location.reload();
          // setIsUser(querySnapshot.docs.map(doc => ({
          //       id: doc.id,
          //       data: doc.data()
          //   })))
        })
  },[])

  let isUser = JSON.parse(localStorage.getItem('userData2'));
  
  if (loading) {
    return (
      <h3
        style={{
          textAlign: "center",
          color: "#002b5b",
          fontWeight: "bold",
          height: "0px",
          lineHeight: "65px",
        }}
      >
        網頁載入中...
      </h3>
    );
  }

  const bodyStyle = {
    backgroundColor: "#ffffff",
  };
  const navbarStyle = {
    width: "100%",
    height: "70px",
    top: "0",
    position: "fixed",
    display: "flex",
    backgroundColor: "#ffffff",
    zIndex: "1",
    borderBottom: "3px solid #90aacb",
  };
  const navtitleStyle = {
    height: "70px",
    color: "#90AACB",
    fontSize: "25px",
    fontWeight: "bold",
    lineHeight: "55px",
    // width: "36%",
  };
  const navpageStyle = {
    height: "70px",
    fontWeight: "bold",
    fontSize: "19px",
    lineHeight: "50px",
  };
  const navitemStyle = {
    marginRight: "8px",
    color: "#002B5B",
    fontSize: "17px",
  };
  const navDonateBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    marginTop: "16px",
    marginBottom: "20px",
    marginLeft: "10px",
    lineHeight: "16px",
    fontSize: "16px",
    width: "100px",
    textAlign: "center",
  };
  const navdropStyle = {
    fontSize: "17px",
    marginRight: "8px",
  };
  const navdropItemStyle = {
    fontWeight: "bold",
    color: "#002B5B",
  };
  const navCartBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    marginTop: "16px",
    marginBottom: "20px",
    marginLeft: "10px",
    lineHeight: "16px",
    fontSize: "16px",
    width: "50px",
    textAlign: "center",
  };
  const navCartSecBtnStyle = {
    color: "#ffffff",
    backgroundColor: "lightgray",
    borderRadius: "30px",
    marginTop: "16px",
    marginBottom: "20px",
    marginLeft: "10px",
    lineHeight: "16px",
    fontSize: "16px",
    width: "50px",
    textAlign: "center",
  };
  const navBellBtnStyle = {
    color: "#002B5B",
    marginTop: "14.5px",
    marginBottom: "20px",
    lineHeight: "16px",
    fontSize: "20px",
    width: "50px",
    textAlign: "center",
    marginLeft: "5px",
  };
  const profilePhotoStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    marginBottom: "15px",
    marginTop: "10px",
  };
  const profilePhotoSecStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    marginBottom: "15px",
    marginTop: "10px",
    backgroundColor: "#fef1e6",
    textAlign: "center",
    marginLeft: "34%",
    fontSize: "13px",
  };
  return (
    <div style={bodyStyle}>
      <Navbar className="nav-bar" style={navbarStyle} expand="lg">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="nav-title"
            style={navtitleStyle}
          >
            捐捐不息&nbsp;Trickle of Benefaction
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="basic-navbar-nav"
          >
            <div>
              <Nav className="me-auto" style={navpageStyle}>
                {/* memeber start*/}
                {isUser[0].data.level === "member" && user && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/process"
                      href="#action/3.1"
                      style={navdropItemStyle}
                    >
                      捐贈進度追蹤
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/donateRecord"
                      href="#action/3.3"
                      style={navdropItemStyle}
                    >
                      捐贈紀錄
                    </Nav.Link>
                    <Nav.Link
                        as={Link}
                        to="/viewRecord"
                        href="#action/3.3"
                        style={navdropItemStyle}
                    >
                      瀏覽紀錄
                    </Nav.Link>
                  </>
                )}
                {/* memeber end*/}
                {/* charity start*/}
                {isUser[0].data.level === "charity" && user && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/upload"
                      href="#home"
                      style={navitemStyle}
                    >
                      刊登物資需求
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/myDemand"
                      href="#home"
                      style={navitemStyle}
                    >
                      我的需求
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      to="/setPassword"
                      href="#home"
                      style={navitemStyle}
                    >
                      初步設定密碼
                    </Nav.Link>
                  </>
                )}
                {/* charity end*/}
                {/* admin start*/}
                {isUser[0].data.level === "admin" && user && (
                  <>
                    <Nav.Link
                      as={Link}
                      to="/managerProve"
                      href="#action/3.2"
                      style={navitemStyle}
                    >
                      審核申請資料
                    </Nav.Link>
                    <NavDropdown
                      title="合作店家相關"
                      id="basic-nav-dropdown"
                      style={navdropStyle}
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/addStores"
                        href="#action/3.2"
                        style={navitemStyle}
                      >
                        新增合作店家
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/allStores"
                        href="#action/3.2"
                        style={navitemStyle}
                      >
                        合作店家一覽表
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                      title="物資相關"
                      id="basic-nav-dropdown"
                      style={navdropStyle}
                    >
                      <NavDropdown.Item
                        as={Link}
                        to="/uploadGoods"
                        href="#action/3.2"
                        style={navitemStyle}
                      >
                        上架物資
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        as={Link}
                        to="/allGoods"
                        href="#action/3.2"
                        style={navitemStyle}
                      >
                        物資一覽表
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
                {/* admin end*/}

                {/* 預設首頁元素 start */}
                {!user && (
                  <Nav.Link
                    as={Link}
                    to="/applicationInfo"
                    href="#home"
                    style={navitemStyle}
                  >
                    申請成為合作機構
                  </Nav.Link>
                )}
                {/* 判斷登入與否 start */}
                {user && (
                  <NavDropdown
                    title="登出"
                    id="basic-nav-dropdown"
                    style={navdropStyle}
                  >
                    <div style={{ textAlign: "center" }}>
                      {user.photoURL && (
                        <img
                          src={user.photoURL}
                          alt="profilePhoto"
                          referrerPolicy="no-referrer"
                          style={profilePhotoStyle}
                        ></img>
                      )}
                      {!user.photoURL && (
                        <div style={profilePhotoSecStyle}>使用者</div>
                      )}
                      {!user.displayName && <h6>使用者，您好！</h6>}
                      {user.displayName && <h6>{user.displayName}，您好！</h6>}
                      <Button
                        onClick={() => auth.signOut()}
                        style={{
                          backgroundColor: "#002b5b",
                          border: "none",
                          fontWeight: "bold",
                          borderRadius: "20px",
                        }}
                      >
                        登出
                      </Button>
                    </div>

                    <NavDropdown.Divider style={{ marginTop: "20px" }} />

                    <NavDropdown.Item
                      as={Link}
                      to="/profile"
                      href="#action/3.4"
                      style={navdropItemStyle}
                    >
                      個人檔案管理
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                {!user && (
                  <Nav.Link as={Link} to="/loginIn" style={navitemStyle}>
                    註冊／登入
                  </Nav.Link>
                )}
                {/* 判斷登入與否 end */}

                <Nav.Link as={Link} to="/donate" style={navDonateBtnStyle}>
                  我要捐贈
                </Nav.Link>
                {user
                  ? (
                    <>
                      <Nav.Link style={navCartBtnStyle}>
                        <FontAwesomeIcon icon={faCartShopping} />
                      </Nav.Link>
                      <Nav.Link style={navBellBtnStyle}>
                        <FontAwesomeIcon icon={faBell} />
                        <sup style={{ fontSize: "14px" }}>1</sup>
                      </Nav.Link>
                    </>)
                  : (<Nav.Link style={navCartSecBtnStyle}>
                    <FontAwesomeIcon icon={faCartShopping} />
                  </Nav.Link>)}
                {/* 預設首頁元素 end */}
              </Nav>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ScrollToTop smooth />
    </div>
  );
}
