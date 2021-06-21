import './ButtonFrame.css';

import {Button} from "./Button";


export const ButtonFrame = ({
    text1,
    text2,
    text3,
    text4,
    style1,
    style2,
    style3,
    style4,
    defaultOnClick,
    onClick1,
    onClick2,
    onClick3,
    onClick4

}) => {
  style1 = style1?style1:"btn--primary--solid";
  style2 = style2?style2:"btn--primary--solid";
  style3 = style3?style3:"btn--primary--solid";
  style4 = style4?style4:"btn--primary--solid";

  onClick1 = onClick1?onClick1:defaultOnClick;
  onClick2 = onClick2?onClick2:defaultOnClick;
  onClick3 = onClick3?onClick3:defaultOnClick;
  onClick4 = onClick4?onClick4:defaultOnClick;

  return (
    <div className="ButtonFrame">
      <Button
          child={text1}
          buttonSize="btn--medium"
          buttonStyle={style1}
          onClick={onClick1}
          />

      <Button
          child={text2}
          buttonSize="btn--medium"
          buttonStyle={style2}
          onClick={onClick2}
          />

      <Button
          child={text3}
          buttonSize="btn--medium"
          buttonStyle={style3}
          onClick={onClick3}
          />

      <Button
          child={text4}
          buttonSize="btn--medium"
          buttonStyle={style4}
          onClick={onClick4}
          />
    </div>
  );
}

