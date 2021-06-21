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

}) => {

  style1 = style1?style1:"btn--primary--solid";
  style2 = style2?style2:"btn--primary--solid";
  style3 = style3?style3:"btn--primary--solid";
  style4 = style4?style4:"btn--primary--solid";
  return (
    <div className="ButtonFrame">
      <Button
          child={text1}
          buttonSize="btn--medium"
          buttonStyle={style1}
          onClick={defaultOnClick}
          />

      <Button
          child={text2}
          buttonSize="btn--medium"
          buttonStyle={style2}
          onClick={defaultOnClick}
          />

      <Button
          child={text3}
          buttonSize="btn--medium"
          buttonStyle={style3}
          />

      <Button
          child={text4}
          buttonSize="btn--medium"
          buttonStyle={style4}
          />
    </div>
  );
}

