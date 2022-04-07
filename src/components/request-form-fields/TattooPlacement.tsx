import { Dispatch, SetStateAction, useContext } from "react";
import RequestContext from "../../context/RequestContext";
import { validateTattooPlacement } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  tattooPlacementError: boolean;
  setTattooPlacementError: Dispatch<SetStateAction<boolean>>;
}

function TattooPlacement({ tattooPlacementError, setTattooPlacementError }: Props) {
  // CONTEXT
  let { tattooPlacement, setTattooPlacement } = useContext(RequestContext);

  return (
    <>
      <span className="label">
        <label htmlFor="tattooPlacement">Tattoo Placement:</label>
      </span>
      <input
        type="text"
        name="tattooPlacement"
        id="tattooPlacement"
        maxLength={30}
        onChange={(e) => validateTattooPlacement(e, setTattooPlacement, setTattooPlacementError)}
        value={tattooPlacement}
        required
      />
      {tattooPlacementError ? <ErrorMessage message={"PLEASE ENTER A TATTOO PLACEMENT"} /> : ""}
    </>
  );
}

export default TattooPlacement;
