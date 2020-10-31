export enum InitalDepositSavings
{
    AccountType = 'Savings',
    Amount = '5000'
}
export enum InitalDepositSalaried
{
    AccountType = 'Salaried',
    Amount = '0'
}
export enum RateofIntrest{
  Personal = '11.25%',
  Education = '9.5%'
}
export enum CitizenshipStatus
{
    Minor = '18',
    Normal = '19',
    Major = '61',
}
export class Constants{
    idTypes = [{
        name: 'Aadhaar card'
     },
     {
       name: 'Ration card No'
     },
     {
        name: 'Permanent account number (PAN) card'
     },
     {
        name: 'Voter ID'
     },
     {
        name: 'Passport'
     }];

     maritalStatus = [{
       name: 'Single'
     },
     {
       name: 'Married'
     }];
     accountType = [{
       name: 'Savings'
     },
     {
       name: 'Salaried'
     }];

     citizenStatus = [{
       name: 'Minor'
     },
     {
       name: 'Normal'
     },
     {
       name: 'Senior'
     }];

     gudTypes = [{
       name: 'Father'
     },
     {
       name: 'Husband'
     }];

loanTyp = ['Education', 'Personal/Home'];
    loanDuration = [
    {
        year: '5'
    },
    {
        year: '10'
    },
    {
        year: '15'
    },
    {
        year: '20'
    }]; }
