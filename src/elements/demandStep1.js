import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import img from "../img/tablet.jpg";

function DemandStep1({id, name, store, cart}) {
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

  let list = JSON.parse(localStorage.getItem('cart'));
  // console.log(list)

  const [buttonStyle, setButtonStyle] = useState({border: "none"})
  const [state, setState] = useState(false)

  // 測試點選返回按鈕後留著上一次的點選紀錄
  // useEffect(() => {
  //   if (list.includes(id)) {
  //     setButtonStyle({...buttonStyle, backgroundColor: "lightgreen"});
  //     setState(true);
  //   }
  // }, []);
  
  function handleSelect() {
    if (!state) {
      setButtonStyle({...buttonStyle, backgroundColor: "lightgreen"});
      cart.push(id);
      setState(true);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    else {
      setButtonStyle({border: "none"});
      setState(false);
      cart.pop();
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }

  return (
    <div>
      <button style={buttonStyle} onClick={handleSelect}>
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
