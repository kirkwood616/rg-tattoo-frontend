import { useContext } from "react";
import RequestContext from "../../context/RequestContext";

function AgeConfirm() {
  // CONTEXT
  let { state, dispatch } = useContext(RequestContext);

  return (
    <>
      <div className="of-age-confirm">
        <input type="checkbox" name="ofAgeConfirm" id="ofAgeConfirm" onChange={() => dispatch({ type: "ageConfirm", value: !state.ageConfirm.value })} />
        <label htmlFor="ofAgeConfirm">I confirm that I am or will be 18 years of age by the date of this requested appointment.</label>
      </div>
    </>
  );
}

export default AgeConfirm;
