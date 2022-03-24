import React from "react";
import { EApprovalStatus } from "../../features/approval/approvalSlice";
import Elipsis from "../Elipsis/Elipsis";
import Spinner from "../Modal/Spinner";

type TProps = {
  handleClick: () => void;
  status: EApprovalStatus;
};

const ApproveBreadButton: React.FC<TProps> = (props) => {
  return (
    <button
      onClick={props.handleClick}
      className="px-4 py-2 flex leading-8 justify-center items-center text-breadgray-200 button-gradient uppercase text-sm"
    >
      {props.status === EApprovalStatus.NOT_APPROVED && "Approve Contract"}
      {props.status === EApprovalStatus.PENDING && (
        <>
          Approval Pending
          <Elipsis />
        </>
      )}
    </button>
  );
};

export default ApproveBreadButton;
