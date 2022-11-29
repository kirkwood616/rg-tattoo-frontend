import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function PhoneNumber() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <label htmlFor="phoneNumber" className={state.appointmentTime.value ? "label" : "label disabled"}>
        Phone:
      </label>
      <input
        type="tel"
        name="phoneNumber"
        id="phoneNumber"
        onChange={(e) => dispatch({ type: "phoneNumber", value: e.target.value })}
        value={state.phoneNumber.value}
      />
      <FormErrorMessage message={"PHONE NUMBER IS NOT VALID"} name={"phoneNumber"} />
    </section>
  );
}

export default PhoneNumber;
