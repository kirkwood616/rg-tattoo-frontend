import FormErrorMessage from "components/errors/FormErrorMessage";
import RequestContext from "context/RequestContext";
import { useContext } from "react";

function LastName() {
  const { state, dispatch } = useContext(RequestContext);

  return (
    <section className="field_container">
      <div className="field_container__label_container">
        <label htmlFor="lastName">Last Name:</label>
      </div>
      <input
        type="text"
        name="lastName"
        id="lastName"
        onChange={(e) => dispatch({ type: "lastName", value: e.target.value })}
        value={state.lastName.value}
      />
      <FormErrorMessage message={"LAST NAME REQUIRED"} name={"lastName"} />
    </section>
  );
}

export default LastName;
