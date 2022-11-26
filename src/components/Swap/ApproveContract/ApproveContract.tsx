import Button from '../../Button';

function ApproveContract() {
  const handleApproveContract = async () => {
    console.log('approving contract...');
  };

  return (
    <div className="py-12 text-xs text-neutral-300">
      <div className="pb-6 text-xs text-neutral-300">
        You&apos;ll need to approve the BREAD contract to mint BREAD
      </div>
      <Button
        onClick={handleApproveContract}
        variant="large"
        dataTest="approve-contract-button"
      >
        Approve Contract
      </Button>
    </div>
  );
}

export default ApproveContract;
