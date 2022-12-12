import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import img from "../img/tablet.jpg";

function DemandStep1({id, name, store}) {
  const card = {
    marginBottom: "20px",
    marginLeft: "10px",
    marginRight: "10px",
    padding: "45px 40px 10px 40px",
    color: "#002B5B",
  };
  const contentStyle = {
    marginTop: "15px",
    marginBottom: "5px",
    textAlign: "center",
  };
  const demandHrefStyle = {
    color: "#90AACB",
  };
  const goodsImgStyle = {
    width: "200px",
    height: "200px",
    marginLeft: "15%",
    marginRight: "75%",
  };
  const buttonStyle = {
    border: "none"
  }

  const [goodsSelect, setGoodsSelect] = useState([])

  function handleSelect() {
    setGoodsSelect()
  }

  return (
    <div>
      <button style={buttonStyle} onClick={() => console.log(`點選了${name}`)}>
        <Card style={card}>
          <Card.Img style={goodsImgStyle} variant="top" src={img} />
          <Card.Body style={contentStyle}>
            <Card.Title>
              物資名稱：<b>{name}</b>
            </Card.Title>
            <hr></hr>
            <Card.Text style={{ color: "#6C6C6C" }}>
              物資提供商家：
              <a style={demandHrefStyle} href="#">
                {store}
              </a>
            </Card.Text>
          </Card.Body>
        </Card>
      </button>
      
    </div>
  );
}

export default DemandStep1;
