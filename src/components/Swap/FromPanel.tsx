import { ChangeEventHandler } from 'react';
import { UseTokenBalanceResult } from '../../hooks/useTokenBalance';
import TokenBalance from '../TokenBalance';
import Icon from './Icon';
import Input from './Input';
import {
  PanelBalanceButton,
  PanelContainer,
  PanelContent,
  PanelHeader,
} from './TokenDisplay';

interface IProps {
  inputValue: string;
  balanceReadings: UseTokenBalanceResult;
  tokenType: 'DAI' | 'BREAD';
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  /* eslint-disable-next-line */
  handleBalanceClick: (balance: string) => void;
}
function FromPanel({
  inputValue,
  balanceReadings,
  tokenType,
  handleBalanceClick,
  handleInputChange,
}: IProps) {
  return (
    <PanelContainer>
      <PanelHeader>
        <PanelBalanceButton
          onClick={() => handleBalanceClick(balanceReadings.value || '')}
        >
          <TokenBalance readings={balanceReadings} />
        </PanelBalanceButton>
      </PanelHeader>
      <PanelContent>
        <Input
          name="from"
          value={inputValue}
          handleInputChange={handleInputChange}
        />
        <Icon type={tokenType} />
        <span className="ml-4 w-20 pt-0.5">{tokenType}</span>
      </PanelContent>
    </PanelContainer>
  );
}

export default FromPanel;
