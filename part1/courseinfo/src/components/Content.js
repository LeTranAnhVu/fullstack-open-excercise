import React from "react";
import Part from "./Part";
const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {
  return (
    <>
      <Part name={part1} exercise={exercises1}/>
      <Part name={part2} exercise={exercises2}/>
      <Part name={part3} exercise={exercises3}/>
    </>
  );
};

export default Content;