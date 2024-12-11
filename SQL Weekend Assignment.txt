create database bankdb;
use bankdb;

#Accounts: AccountID  PRIMARY KEY, CustomerID , AccountType , Balance, CreatedDate , FOREIGN KEY (CustomerID) 
CREATE TABLE Accounts (
    AccountID INT AUTO_INCREMENT PRIMARY KEY,
    CustomerID INT,
    AccountType VARCHAR(20),
    Balance DECIMAL(15, 2),
    CreatedDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

#Customers : CustomerID PRIMARY KEY, FirstName , LastName , Email , Phone , Address 
CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    Phone VARCHAR(20),
    Address VARCHAR(255)
);
#TABLE Transactions:  TransactionID PRIMARY KEY, AccountID INT, TransactionType ,Amount ,TransactionDate, FOREIGN KEY (AccountID) 

CREATE TABLE Transactions (
    TransactionID INT AUTO_INCREMENT PRIMARY KEY,
    AccountID INT,
    TransactionType VARCHAR(20),
    Amount DECIMAL(15, 2),
    TransactionDate DATETIME,
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);
#TABLE Branches :  BranchID  PRIMARY KEY, BranchName,Location

CREATE TABLE Branches (
    BranchID INT AUTO_INCREMENT PRIMARY KEY,
    BranchName VARCHAR(100),
    Location VARCHAR(100)
);
# Employees: EmployeeID PRIMARY KEY, BranchID , FirstName, LastName , Role , Salary , FOREIGN KEY (BranchID) 
CREATE TABLE Employees (
    EmployeeID INT AUTO_INCREMENT PRIMARY KEY,
    BranchID INT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Role VARCHAR(50),
    Salary DECIMAL(15, 2),
    FOREIGN KEY (BranchID) REFERENCES Branches(BranchID)
);
INSERT INTO Customers (FirstName, LastName, Email, Phone, Address) VALUES ('John', 'Doe', 'john.doe@example.com', '1234567890', '123 Elm St'), ('Jane', 'Smith', 'jane.smith@example.com', '9876543210', '456 Oak St'), ('Michael', 'Brown', 'michael.brown@example.com', '5678901234', '789 Pine St');

INSERT INTO Accounts (CustomerID, AccountType, Balance, CreatedDate)
VALUES
(1, 'Savings', 5000.00, '2023-01-15'),
(1, 'Checking', 2000.00, '2023-02-10'),
(2, 'Savings', 10000.00, '2023-03-05'),
(3, 'Savings', 7000.00, '2023-04-20');


INSERT INTO Transactions (AccountID, TransactionType, Amount, TransactionDate)
VALUES
(1, 'Deposit', 1000.00, '2023-01-20 10:00:00'),
(1, 'Withdrawal', 500.00, '2023-01-25 14:30:00'),
(2, 'Deposit', 2000.00, '2023-02-15 09:15:00'),
(3, 'Withdrawal', 1000.00, '2023-04-25 16:45:00');

#Question: List all customers and their accounts with balances.
SELECT c.FirstName, c.LastName, a.AccountID, a.AccountType, a.Balance
FROM Customers c
JOIN Accounts a ON c.CustomerID = a.CustomerID;


#Problem Statement: List all employees who manage branches where the total account balances
# exceed $20,000.
SELECT e.EmployeeID, e.FirstName, e.LastName, e.Role, e.Salary, b.BranchName
FROM Employees e
JOIN Branches b ON e.BranchID = b.BranchID
JOIN (
    SELECT a.CustomerID, SUM(a.Balance) AS TotalBalance
    FROM Accounts a
    GROUP BY a.CustomerID
    HAVING SUM(a.Balance) > 2000
) AS AccountBalances
ON e.BranchID = b.BranchID
GROUP BY e.EmployeeID;


#Problem Statement: Identify accounts whose balance is higher than the average balance of accounts within 
#their branch.
Select a.AccountID, a.AccountType, a.Balance From Accounts a
Join Customers c ON a.CustomerID = c.CustomerID
Join(Select c.CustomerID, AVG(a.Balance) AS AvgBalance
    From Accounts a
    Join Customers c on a.CustomerID = c.CustomerID
    group by c.CustomerID
) as avg_balance
on c.CustomerID = avg_balance.CustomerID
Where a.Balance > avg_balance.AvgBalance;

#: Find customers who have at least one transaction of more than $1,000.
select * from customers c join accounts a 
on a.customerid = c.customerid 
join transactions t on t.accountid=a.accountid
where t.amount>1000;

# Get the total deposits and total withdrawals for each account, along with the account type.

#Problem Statement: Find pairs of customers who have accounts with the same account type and belong to the same branch.
Select c1.CustomerID as Customer1, c2.CustomerID as Customer2, a1.AccountType
From Customers c1
Join Accounts a1 on c1.CustomerID = a1.CustomerID
join Customers c2 on c1.CustomerID < c2.CustomerID
join Accounts a2 on c2.CustomerID = a2.CustomerID and a1.AccountType = a2.AccountType
where c1.CustomerID != c2.CustomerID;
#Problem Statement: Find customers who do not have any transactions recorded.
Select c.CustomerID, c.FirstName, c.LastName
From Customers c
left join  Accounts a on c.CustomerID = a.CustomerID
left join Transactions t on a.AccountID = t.AccountID
Where t.TransactionID IS NULL;

# Rank customers based on their total balance across all accounts.
Select c.CustomerID, c.FirstName, c.LastName, SUM(a.Balance) as TotalBalance,
       RANK() OVER (ORDER BY SUM(a.Balance) DESC) AS Ranks
From Customers c
Join Accounts a ON c.CustomerID = a.CustomerID
group by c.CustomerID, c.FirstName, c.LastName
order by Ranks;

# List employees whose salary is above the average salary of all employees in their branch.
select e.EmployeeID, e.FirstName, e.LastName, e.Salary, b.BranchName
From Employees e
join Branches b on e.BranchID = b.BranchID
Where e.Salary > (
    SELECT AVG(e2.Salary)
    FROM Employees e2
    WHERE e2.BranchID = e.BranchID
);