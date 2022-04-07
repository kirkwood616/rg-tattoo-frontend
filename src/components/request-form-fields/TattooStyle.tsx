import { Dispatch, SetStateAction, useEffect } from "react";
import ErrorMessage from "../ErrorMessage";

interface Props {
  tattooStyle: string;
  setTattooStyle: Dispatch<SetStateAction<string>>;
  tattooStyleError: boolean;
  setTattooStyleError: Dispatch<SetStateAction<boolean>>;
}

function TattooStyle({ tattooStyle, setTattooStyle, tattooStyleError, setTattooStyleError }: Props) {
  useEffect(() => {
    if (tattooStyle !== "select") setTattooStyleError(false);
  }, [tattooStyle, setTattooStyleError]);

  return (
    <>
      <span className="label">
        <label htmlFor="tattooStyle">Tattoo Style:</label>
      </span>
      <select name="tattooStyle" id="tattooStyle" onChange={(e) => setTattooStyle(e.target.value)} value={tattooStyle} required>
        <option value="select" disabled>
          --- Select Style ---
        </option>
        <option value="Linework">Linework</option>
        <option value="Black & White">Black & White</option>
        <option value="Full Color">Full Color</option>
        <option value="Lettering">Lettering</option>
      </select>
      {tattooStyleError ? <ErrorMessage message={"PLEASE SELECT A TATTOO STYLE"} /> : ""}
    </>
  );
}

export default TattooStyle;
