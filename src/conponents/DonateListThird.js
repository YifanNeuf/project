import { Container, Col, Row  } from "react-bootstrap";
import React, { useState } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
// import ButtonLink from "../elements/button";
import ProductStep3 from "../elements/productStep3";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { doc, setDoc, collection, arrayUnion } from "firebase/firestore";
import { db } from "../utils/firebase";
import $ from "jquery";
import { v4 as uuidv4 } from "uuid";
import shortUUID from "short-uuid";
import ProgressBar from "react-bootstrap/ProgressBar";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user) {
    navigate("/loginin");
  }
  // const [docid, setDocid] = useState(uuidv4());
  // console.log(docid)
  // eg. 73WakrfVbNJBaAmhQtEeDv
  // console.log(shortUUID.generate());
  const { totalAmount } = useLocation().state;
  // console.log(totalAmount);

  const nextStepStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    marginLeft: "10px",
    height: "35px",
    fontWeight: "bold",
  };
  const returnStepStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    border: "none",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
  };
  const stepBtnStyle = {
    marginBottom: "40px",
    marginTop: "25px",
    textAlign: "center",
  };
  const payStyle = {
    margin: "20px 15% 40px 15%",
    color: "#002b5b",
  };

  let donateList = JSON.parse(localStorage.getItem("donateList"));
  const [merchantTradeNo, setMerchantTradeNo] = useState(shortUUID.generate());
  
  // 測試連接 php 用
  // const [result, setResult] = useState('');
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const form = $(e.target);
  //   $.ajax({
  //       type: "POST",
  //       url: form.attr("action"),
  //       data: form.serialize(),
  //       success(data) {
  //           setResult(data);
  //       },
  //   });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('start firebase')
      // for (let i = 0; i < donateList.length; i++) {
        await setDoc(doc(db, "donate", merchantTradeNo), {
          merchantTradeNo: merchantTradeNo,
          uid: user.uid,
          donateList: arrayUnion(...donateList),
          totalAmount: totalAmount
        });
      // }
      // navigate("http://localhost:8000/EcPay/createOrder.php");
      // window.location.href = `http://localhost:8000/EcPay/createOrder.php`
      alert("正在前往付款介面......");
      localStorage.removeItem("donateList");
      localStorage.removeItem("donateCart");
      console.log('end firebase')

      console.log('start axios')
      const data = 'test connection of php';
      axios.post("http://localhost:8000/EcPay/createOrder.php", data).then((response) => {
        console.log(response.data);
      });
      console.log('end axios')
    } catch (err) {
      console.log(err);
      // window.location.reload();
      alert("認購過程有誤，請重新認購一次，謝謝。");
    }
  };

  return (
    <div>
      <Navbar />
      <TitleSec name="認購物資需求" />
      <Container>
        <Row style={{ fontSize: "35px", marginBottom: "30px" }}>
          <ProgressBar
            style={{
              position: "absolute",
              marginTop: "19px",
              zIndex: "1",
              width: "1070px",
              marginLeft: "120px",
            }}
            now={100}
          ></ProgressBar>
          <Col style={{ textAlign: "center", zIndex: "2" }}>
            <FontAwesomeIcon
              style={{
                color: "#26aa50",
                marginRight: "60px",
                backgroundColor: "white",
                borderRadius: "100%",
              }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginRight: "60px" }}>開始</span>
          </Col>
          <Col style={{ zIndex: "2" }}>
            <FontAwesomeIcon
              style={{
                color: "#26aa50",
                marginLeft: "120px",
                backgroundColor: "white",
                borderRadius: "100%",
              }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginLeft: "92px" }}>
              選擇認購物資
            </span>
          </Col>
          <Col style={{ zIndex: "2" }}>
            <FontAwesomeIcon
              style={{
                color: "#26aa50",
                marginLeft: "150px",
                backgroundColor: "white",
                borderRadius: "100%",
              }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginLeft: "137px" }}>
              填寫資料
            </span>
          </Col>
          <Col style={{ zIndex: "2" }}>
            <FontAwesomeIcon
              style={{ color: "lightgray", marginLeft: "170px" }}
              icon={faCircleCheck}
            />
            <br />
            <span style={{ fontSize: "15px", marginLeft: "157px" }}>
              確認付款
            </span>
          </Col>
        </Row>
        <TitleStep name="STEP3&nbsp;-&nbsp;確認付款" />
        {donateList ? (
          donateList.map((item, index) => (
            <>
              <ProductStep3
                key={index}
                id={item.id}
                name={item.name}
                store={item.store}
                charity={item.charity}
                description={item.description}
                quantity={item.quantity}
                count={item.count}
                price={item.price}
                subtotal={item.subtotal}
              />
            </>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "35px" }}>
            <p style={{ color: "red", fontWeight: "bold" }}>
              ※請返回上一頁填寫需求物資之資料。
            </p>
          </div>
        )}
        {donateList ? (
          <>
            <p
              style={{
                fontSize: "17px",
                textAlign: "center",
                marginTop: "10px",
                color: "red",
                fontWeight: "bold",
              }}
            >
              ※總計：${totalAmount}
            </p>
            <div style={payStyle}>
              <h5>
                 <b>可使用之付款方式：</b>
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#d7e9f7",
                  textAlign: "center",
                }}
              >
                超商代碼
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#FFECF5",
                  textAlign: "center",
                }}
              >
                ATM轉帳
              </h5>
              <h5
                style={{
                  margin: "20px 0px 10px 0px",
                  backgroundColor: "#F0FFF0",
                  textAlign: "center",
                }}
              >
                多元支付
              </h5>
            </div>
            <p
              style={{
                fontSize: "17px",
                textAlign: "center",
                marginTop: "10px",
                color: "red",
                fontWeight: "bold",
              }}
            >
              ※注意：完成付款後視為認購成立，不得取消。
            </p>
          </>
          
        ) : (
          ""
        )}
        <div style={stepBtnStyle}>
          <Link to="/donatestep2">
            <button
              style={returnStepStyle}
              onClick={() => {
                localStorage.removeItem("demandList");
              }}
            >
              返回
            </button>
          </Link>
          {/* onClick={handleSubmit} */}
          {donateList !== null ? (
            // <form action="http://localhost:8000/EcPay/createOrder.php" method="post" onSubmit={handleSubmit}>
            //   <input type="hidden" name="donateList" value={donateList}/>
            //   <input type="hidden" name="tmp" value="fudhvdivu1232543"/>
            // </form>
            <button style={nextStepStyle} onClick={handleSubmit}>前往付款</button>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );

  // return (
  //   <div>
  //     <Navbar />
  //     <TitleSec name="捐贈物資列表" />
  //     <Container>
  //       <TitleStep name="STEP3&nbsp;-&nbsp;確認並付款" />
  //       <div>
  //         <ProductStep3 />
  //       </div>
  //       <div>
  //         <ProductStep3 />
  //       </div>
  //       <div style={payStyle}>
  //         <h5>
  //           <b>付款方式：</b>
  //         </h5>
  //         <h5
  //           style={{
  //             margin: "20px 0px 10px 0px",
  //             backgroundColor: "#d7e9f7",
  //             textAlign: "center",
  //           }}
  //         >
  //           超商代碼
  //         </h5>
  //         <h5
  //           style={{
  //             margin: "20px 0px 10px 0px",
  //             backgroundColor: "#FFECF5",
  //             textAlign: "center",
  //           }}
  //         >
  //           ATM轉帳
  //         </h5>
  //         <h5
  //           style={{
  //             margin: "20px 0px 10px 0px",
  //             backgroundColor: "#F0FFF0",
  //             textAlign: "center",
  //           }}
  //         >
  //           多元支付
  //         </h5>
  //       </div>
  //       <p
  //         style={{
  //           fontSize: "17px",
  //           textAlign: "center",
  //           marginTop: "10px",
  //           color: "red",
  //           fontWeight: "bold",
  //         }}
  //       >
  //         ※注意：付款視為捐贈成立，不得取消。
  //       </p>
  //       <div style={stepBtnStyle}>
  //         <div style={returnStepStyle}>
  //           <ButtonLink to="/donatestep2" name="返回" />
  //         </div>
  //         <div style={nextStepStyle}>
  //           <ButtonLink to="#" name="下一步" />
  //         </div>
  //       </div>
  //       {/* <form
  //         action="http://localhost:8000/EcPay/createOrder.php"
  //         method="post"
  //         onSubmit={(event) => handleSubmit(event)}
  //       >
  //         <button type="submit">發送訂單（測試）</button>
  //       </form> */}

  //       <form id="idFormAioCheckOut" method="post" action="http://localhost:8000/EcPay/createOrder.php">
  //         <button type="submit">綠界線上支付</button>
  //       </form>
  //       <h1>{result}</h1>
  //     </Container>
  //   </div>
  // );
}

export default UploadDemand;
