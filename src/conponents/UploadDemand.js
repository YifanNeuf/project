import { Container } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import FromSelect from "../elements/fromSelect";
import Search from "../elements/search";
import DemandStep1 from "../elements/demandStep1";
import ButtonLink from "../elements/button";
import PaginationList from "../elements/paginationList";
import Navbar from "../elements/navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user){
    navigate("/loginin");
  }

  const subBtnStyle = {
    color: "#ffffff",
    backgroundColor: "#002B5B",
    borderRadius: "30px",
    fontSize: "16px",
    width: "120px",
    textAlign: "center",
    height: "35px",
    fontWeight: "bold",
    marginLeft: "46.5%",
    marginTop: "40px"
  };

  const [details, setDetails] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'supply'))
    onSnapshot(q, (querySnapshot) => {
      setDetails(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  // details.map((item) =>
  //   console.log(item)
  // )

  return (
    <div>
      <Navbar />
      <TitleSec name="刊登物資需求" />
      <Container>
        <TitleStep name="STEP1&nbsp;-&nbsp;選擇需求物資" />
        {/* <Row>
          <Col>
            <DemandStep1 />
          </Col>
          <Col>
            <DemandStep1 />
          </Col>
          <Col>
            <DemandStep1 />
          </Col>
        </Row> */}
        {details.map((item, index) => (
          <DemandStep1
            key={index}
            id={item.id}
            name={item.data.name}
            store={item.data.store}
          />
        ))}
        
        <PaginationList />
        <div
          style={{
            marginTop: "25px",
            marginBottom: "40px",
            marginLeft: "45%",
            marginRight: "55%",
          }}
        >
          <Link to="/demandstep2" state={{ from: "occupation" }}>
            <button style={subBtnStyle}>下一步</button>
          </Link>
          
          {/* <ButtonLink to"/demandstep2" name="下一步"> */}
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
