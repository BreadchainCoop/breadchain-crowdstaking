before(() => {
  cy.visit('/');
});

beforeEach(() => {
  cy.disconnectMetamaskWalletFromAllDapps();
  cy.get("[data-test='connect-wallet-metamask']").as('connectWalletButton');
});

describe('Connect Wallet', () => {
  it('wallet successfully connects', () => {
    cy.changeMetamaskNetwork('localhost');
    cy.get('@connectWalletButton').click();
    cy.acceptMetamaskAccess();
    // balance should be displayed (20k DAIm 0 BREAD)

    // TODO assert balances are displayed  correctly
  });
});

describe('Unsupported Network', () => {
  it('displays a message if not connected to a supported network', () => {
    cy.changeMetamaskNetwork('ethereum');
    cy.get('@connectWalletButton').click();
    cy.acceptMetamaskAccess();

    cy.contains('Unsupported Network').should('exist');
  });
});

describe('Approve Contract', () => {
  it('Allows user to approve contract', () => {
    cy.get("[data-test='connect-wallet-metamask']").as('connectWalletButton');
    cy.changeMetamaskNetwork('localhost');

    // connect wallet
    cy.get('@connectWalletButton').click();
    cy.acceptMetamaskAccess();

    cy.contains('Approve Contract').should('exist');

    // approve contract
    cy.get("[data-test='approve-contract-button']").click();

    cy.get("[data-test='modal']").should('exist');

    cy.confirmMetamaskPermissionToSpend();

    cy.contains('Approve Contract').should('not.exist');
  });
});

/**
 
Nothing currently displayed to indicate approve contract transaction in progress


*/
