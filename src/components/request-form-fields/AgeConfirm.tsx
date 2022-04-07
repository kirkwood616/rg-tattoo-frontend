import { Dispatch, SetStateAction } from "react";

interface Props {
  ofAgeConfirm: boolean;
  setOfAgeConfirm: Dispatch<SetStateAction<boolean>>;
}

function AgeConfirm({ ofAgeConfirm, setOfAgeConfirm }: Props) {
  return (
    <>
      <div className="of-age-confirm">
        <input type="checkbox" name="ofAgeConfirm" id="ofAgeConfirm" onChange={() => setOfAgeConfirm(!ofAgeConfirm)} />
        <label htmlFor="ofAgeConfirm">I confirm that I am or will be 18 years of age by the date of this requested appointment.</label>
      </div>
    </>
  );
}

export default AgeConfirm;
