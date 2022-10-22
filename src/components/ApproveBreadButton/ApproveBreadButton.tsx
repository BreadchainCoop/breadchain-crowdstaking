import Button from "@/components/Button";
import Elipsis from "@/components/Elipsis";

import { EApprovalStatus } from "../../features/approval/approvalSlice";

interface IProps {
  handleClick: () => void;
  status: EApprovalStatus;
}

const ApproveBreadButton = ({ status, handleClick }: IProps) => {
  return (
    <Button
      onClick={handleClick}
      variant="large"
      dataTest="approve-contract-button"
    >
      {status === EApprovalStatus.NOT_APPROVED ? (
        "Approve Contract"
      ) : (
        <>
          Approval Pending
          <Elipsis />
        </>
      )}
    </Button>
  );
};

export default ApproveBreadButton;
