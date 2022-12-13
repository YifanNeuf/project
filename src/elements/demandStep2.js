import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import img from "../img/tablet.jpg";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { collection, query, onSnapshot, where } from "firebase/firestore";
// import { db } from "../utils/firebase";

function DemandStep2({name, store, charity, user}) {
  // console.log(user);
  const card = {
    marginBottom: "20px",
    marginLeft: "15%",
    marginRight: "15%",
    padding: "40px 40px 40px 40px",
    color: "#002B5B",
    width: "70%",
    display: "flex",
    flexDirection: "row",
  };
  const contentStyle = {
    textAlign: "left",
    marginLeft: "30px",
    letterSpacing: "2px",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    width: "200px",
    height: "200px",
  };
  const inputStyle = {
    border: "1.5px solid #90AACB",
    width: "15%",
    height: "30px",
    textAlign: "center",
  };
  const inputSecStyle = {
    border: "1.5px solid #90AACB",
    width: "75%",
    height: "30px",
  };
  const btnDashStyle = {
    backgroundColor: "#002B5B",
    width: "30px",
    height: "30px",
    paddingTop: "0px",
    textAlign: "left",
    border: "none",
    borderRadius: "100px",
    marginLeft: "3px",
    marginRight: "3px",
  };
  const btnAddStyle = {
    backgroundColor: "#002B5B",
    width: "30px",
    height: "30px",
    paddingTop: "0px",
    textAlign: "left",
    border: "none",
    borderRadius: "100px",
    marginLeft: "3px",
    marginRight: "3px",
    paddingLeft: "9px",
  };

  const [count, setCount] = useState(0);
  console.log(count);
  // // 抓charity DB data
  // const [charityData, setCharityData] = useState([]);
  // useEffect(() => {
  //   const q = query(collection(db, 'charity'), where("info.mail", "==", user.email))
  //   onSnapshot(q, (querySnapshot) => {
  //     setCharityData(querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })))
  //   })
  // }, [])

  return (
    <div>
      <Card style={card}>
        <Card.Img style={goodsImgStyle} variant="top" src={img} />
        <Card.Body style={contentStyle}>
          <Card.Title>
            物資名稱：<b>{name}</b>
          </Card.Title>
          <hr></hr>
          <Card.Text style={{ color: "#6C6C6C" }}>
            需求機構：{user.displayName}
            <br />
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                lineHeight: "30px",
              }}
            >
              需求數量：
              <Button style={btnDashStyle} variant="primary"
                onClick={() => {
                  if(count > 0) {
                    setCount(count-1)}
                  }
                }
              >
                -
              </Button>
              {/* onChange={(e) => setCount(e.target.value)} */}
              <Form.Control
                style={inputStyle}
                placeholder={count}
                onChange={(e) => setCount(e.target.value)}/>
              <Button style={btnAddStyle} variant="primary" onClick={() => setCount(count+1)}>
                +
              </Button>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                lineHeight: "30px",
              }}
            >
              需求說明：
              <Form.Control style={inputSecStyle} placeholder="請輸入文字..." />
            </div>
            <br />
            物資提供商家：
            <a style={demandHrefStyle} href="#">
              {store}
            </a>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DemandStep2;
