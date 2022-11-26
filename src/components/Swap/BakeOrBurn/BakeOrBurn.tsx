import Button from '../../Button';

interface IProps {
  mode: 'BAKE' | 'BURN',
  value: string
}

function BakeOrBurn({ mode, value }: IProps) {
  const handleSubmit = async () => {

  };

  return (
    <Button
      onClick={handleSubmit}
      disabled={
        transaction?.status === 'PENDING'
        || parseFloat(value) === 0
        || value === ''

      }
      variant="large"
      fullWidth
    >
      {mode === 'BURN' ? 'BURN BREAD' : 'BAKE BREAD'}
    </Button>
  );
}

export default BakeOrBurn;
