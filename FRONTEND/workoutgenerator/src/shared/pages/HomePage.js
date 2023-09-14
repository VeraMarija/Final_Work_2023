import React from "react";

import "./HomePage.css";
import Card from "../components/UIElements/Card";

const HomePage = (props) => {
  return (
    <div className="home">
    <Card className="home-description">
      <h1>Start making your own workout</h1>
        <a>
          Want to know what's your maximum amount of weight that you can lift
          for one repetition? Start with creating your own personal workout by
          choosing from different exercises and enjoy in gaining strength and
          shaping your body.
        </a>
      </Card>
    </div>
  );
};

export default HomePage;
