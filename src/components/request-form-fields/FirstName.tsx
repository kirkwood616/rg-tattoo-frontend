import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function FirstName() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor="firstName">First Name:</label>
      </div>
      <input
        type="text"
        name="firstName"
        id="firstName"
        onChange={(e) => dispatch({ type: "firstName", value: e.target.value })}
        value={state.firstName.value}
      />
      <FormErrorMessage message="FIRST NAME REQUIRED" name={"firstName"} />
    </section>
  );
}

export default FirstName;
