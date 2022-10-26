import Button from '../Button';
import Elipsis from '../Elipsis';

interface IProps {
  handleClick: () => void;
  status: 'NOT_APPROVED';
}

function ApproveBreadButton({ status, handleClick }: IProps) {
  return (
    <Button
      onClick={handleClick}
      variant="large"
      dataTest="approve-contract-button"
    >
      {status === 'NOT_APPROVED' ? (
        'Approve Contract'
      ) : (
        <>
          Approval Pending
          <Elipsis />
        </>
      )}
    </Button>
  );
}

export default ApproveBreadButton;
