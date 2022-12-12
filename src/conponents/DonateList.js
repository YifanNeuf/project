import { Col, Container, Row } from "react-bootstrap";
import React, { Component } from "react";
// import ListGroup from "react-bootstrap/ListGroup";
import Pagination from "react-bootstrap/Pagination";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import FromSelect from "../elements/fromSelect";
import Search from "../elements/search";
import ProductStep1 from "../elements/productStep1";
import ButtonLink from "../elements/button";
import PaginationList from "../elements/paginationList";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const DonateList = () => {
  const [user] = useAuthState(auth);
  const donPageStyle = {
    marginTop: "70px",
  };
  const selectPageStyle = {
    display: "flex",
    flexDirection: "row",
  };
  const goodsPageStyle = {
    display: "flex",
    flexDirection: "row",
  };
  const paginationStyle = {
    marginLeft: "28%",
    marginRight: "62%",
    marginTop: "20px",
  };
  return (
    <div>
      <Navbar />
      <div style={donPageStyle}>
        <TitleSec name="捐贈物資列表" />
        <Container>
          <TitleStep name="STEP1&nbsp;-&nbsp;選擇捐贈物資" />
          <div style={selectPageStyle}>
            <div style={{ width: "50%" }}>
              <FromSelect />
            </div>
            &nbsp;
            <div style={{ width: "50%" }}>
              <Search />
            </div>
          </div>
          {/* <div style={goodsPageStyle}>
            <ProductStep1 />
            <ProductStep1 />
            <ProductStep1 />
          </div>
          <div style={goodsPageStyle}>
            <ProductStep1 />
            <ProductStep1 />
            <ProductStep1 />
          </div> */}
          <Row>
            <Col>
              <ProductStep1
                name="【Tempo】極吸萬用三層廚房紙巾(捲筒式)125張x16捲"
                charity="財團法人瑞信兒童醫療基金會"
                num="10"
                intro="提供給偏鄉孩童授課使用"
                supply="7-ELEVEN 輔進門市"
                price="299"
              />
            </Col>
            <Col>
              <ProductStep1
                name="【春風】超細柔抽取式衛生紙110抽24包"
                charity="社團法人中華愛悅公益慈善發展協會"
                num="20"
                intro="提供給獨居老人使用"
                supply="7-ELEVEN 輔大門市"
                price="329"
              />
            </Col>
            <Col>
            <ProductStep1
                name="【春風】超細柔抽取式衛生紙110抽24包"
                charity="社團法人中華愛悅公益慈善發展協會"
                num="20"
                intro="提供給獨居老人使用"
                supply="7-ELEVEN 輔大門市"
                price="329"
              />
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <ProductStep1 />
            </Col>
            <Col>
              <ProductStep1 />
            </Col>
            <Col>
              <ProductStep1 />
            </Col>
          </Row> */}
          {/* <PaginationList /> */}
          {user && (
            <div
              style={{
                marginTop: "25px",
                marginBottom: "40px",
                marginLeft: "45%",
                marginRight: "55%",
              }}
            >
              <ButtonLink to="/donateStep2" name="下一步" />
            </div>
          )}
          {!user && (
            <div
              style={{
                marginTop: "25px",
                marginBottom: "40px",
                marginLeft: "43%",
              }}
            >
              <button
                style={{
                  color: "#ffffff",
                  backgroundColor: "lightgray",
                  border: "none",
                  borderRadius: "30px",
                  fontSize: "16px",
                  width: "180px",
                  textAlign: "center",
                  height: "35px",
                  fontWeight: "bold",
                }}
              >
                登入後可進行下一步
              </button>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default DonateList;
