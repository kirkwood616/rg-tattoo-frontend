import { Dispatch, SetStateAction } from "react";
import { validateTattooPlacement } from "../../functions/Validation";
import ErrorMessage from "../ErrorMessage";

interface Props {
  tattooPlacement: string;
  setTattooPlacement: Dispatch<SetStateAction<string>>;
  tattooPlacementError: boolean;
  setTattooPlacementError: Dispatch<SetStateAction<boolean>>;
}

function TattooPlacement({ tattooPlacement, setTattooPlacement, tattooPlacementError, setTattooPlacementError }: Props) {
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
