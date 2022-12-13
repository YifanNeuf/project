import { Container } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "../App.css";
import TitleSec from "../elements/titleSec";
import TitleStep from "../elements/titleStep";
import ButtonLink from "../elements/button";
import DemandStep2 from "../elements/demandStep2";
import Navbar from "../elements/navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../utils/firebase";

function UploadDemand() {
  const navigate = useNavigate("");
  const [user] = useAuthState(auth);
  if (!user){
    navigate("/loginin");
  }
  // console.log(user.email);

  // const location = useLocation();
  // const { from } = location.state;

  // console.log(from);

  const nextStepStyle = {
    marginLeft: "10px",
  };
  const returnStepStyle = {
    marginLeft: "39%",
  };
  const stepBtnStyle = {
    display: "flex",
    flexDirection: "row",
    marginBottom: "40px",
    marginTop: "20px",
  };

  // 抓supply DB data
  const [details, setDetails] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'supply'))
    onSnapshot(q, (querySnapshot) => {
      setDetails(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  // 抓charity DB data
  // const [charityData, setCharityData] = useState([]);
  // useEffect(() => {
  //   const userData = user;
  //   const q = query(collection(db, 'charity'), where('info.mail', "=", userData.email))
  //   onSnapshot(q, (querySnapshot) => {
  //     setCharityData(querySnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })))
  //   })
  // }, [])

  // let charityName = "";
  // charityData.map((item) =>
  //   charityName = item
  // )

  // console.log(charityName);



  return (
    <div>
      <Navbar />
      <TitleSec name="刊登物資需求" />
      <Container>
        <TitleStep name="STEP2&nbsp;-&nbsp;填寫資料" />
        {details.map((item, index) => (
          <>
            <DemandStep2
              key={index}
              id={item.id}
              name={item.data.name}
              store={item.data.store}
              user={user}
              // 預留charity data
            />
          </>
        ))}
        <div style={stepBtnStyle}>
          <div style={returnStepStyle}>
            <ButtonLink to="/demandstep1" name="返回" />
          </div>
          <div style={nextStepStyle}>
            <ButtonLink to="/demandstep3" name="下一步" />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UploadDemand;
