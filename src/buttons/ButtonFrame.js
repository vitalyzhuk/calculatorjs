import './ButtonFrame.css';

import {Button} from "./Button";


export const ButtonFrame = ({
    text1,
    text2,
    text3,
    text4

}) => {
  return (
    <div className="ButtonFrame">
          <header className="ButtonFrame-header">
          <div>
              <Button
              child={text1}
              buttonSize="btn--medium"
              buttonStyle="btn--primary--solid"
              />
          </div>

          <div>
              <Button
              child={text2}
              buttonSize="btn--medium"
              buttonStyle="btn--primary--solid"
              />
          </div>

          <div>
              <Button
              child={text3}
              buttonSize="btn--medium"
              buttonStyle="btn--primary--solid"
              />
          </div>

          <div>
              <Button
              child={text4}
              buttonSize="btn--medium"
              buttonStyle="btn--primary--solid"
              />
          </div>
          </header>
    </div>
  );
}

