//package pack.cap.module5.module4;
//Generalization 
class BankAccount{
	String accountNumber;
	double balance;
	public BankAccount(String accountNumber, double balance) {
		super();
		this.accountNumber = accountNumber;
		this.balance = balance;
	}
	public void deposit(double amount) {
		if( amount>0) {
			balance += amount;
			System.out.println("Deposited successfully : "+ amount + "New Balance :"+ balance);
		}else {
			System.out.println("deposite amount must be positive ");
		}
	}
	public void withDraw(double amount ) {
		if(amount >0 && amount <= balance ) {
			balance -= amount ; 
			System.out.println("withdrqw successfully : "+ amount + "New Balance :"+ balance);
		}else {
			System.out.println("insufficient balance ");
		}
	}
	public void checkBalance() {
		System.out.println("Balance for account "+accountNumber +" $ "+ balance);
	}
}

//specialization 
class SavingsAccount extends BankAccount{
	double intRate;
	public SavingsAccount(String accountNumber, double balance , double intRate) {
		super(accountNumber, balance);
		// TODO Auto-generated constructor stub
		this.intRate = intRate;
	}
public void applyInterest () {
	double intr = balance * intRate ;
	balance += intr;
	System.out.println("Interest of $ "+ intr +" applied New balance "+ balance);
	
		}}
class CheckingAccount extends BankAccount{
	double fee;
	public CheckingAccount(String accountNumber, double balance,double fee) {
		super(accountNumber, balance);
		// TODO Auto-generated constructor stub
		this.fee = fee;
	}
	@Override
	public void withDraw(double amount) {
		// TODO Auto-generated method stub
		super.withDraw(amount);
		if(amount > 0 && amount <= balance) {
			balance -= amount ; 
			balance -= fee;
			System.out.println("withdraw "+amount + " with fee of "+fee);
		}else {
			System.out.println("Insufficieant balance ");
		}
	}

	}




public class GenspeDemo {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
    SavingsAccount sa = new SavingsAccount("SA123", 5000, 0.03);
    sa.deposit(10000);
    sa.applyInterest();
    
    CheckingAccount ca = new CheckingAccount("CA456", 4000, 2.5);
    ca.deposit(1000);
    ca.withDraw(200);
    
    SavingsAccount sacAccount = new SavingsAccount("SA123", 5000, 0.03);
        sa.deposit(10000);  
        sa.checkBalance(); 
        sa.applyInterest();
        sa.checkBalance();  
        
        System.out.println("----------------------------------");

        // Creating a CheckingAccount instance
        CheckingAccount cacCheckingAccount = new CheckingAccount("CA456", 4000, 2.5);
        ca.deposit(1000);  
        ca.checkBalance();
        ca.withDraw(200);  
        ca.checkBalance();
        ca.withDraw(5000); 
        ca.checkBalance();  
        sa.deposit(-500);  
        sa.checkBalance();
    
	}

}
