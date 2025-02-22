import java.util.Scanner;

class ATM{
    float Balance;
    int PIN = 123;

    public void checkpin (){
        System.out.println("Enter Your PIN");
        Scanner sc  = new Scanner(System.in);
        int enteredpin = sc.nextInt();
        if(enteredpin == PIN){
            menu();
        }else {
            System.out.println("Incorrect PIN");
            checkpin();
        }
    }

    // MENU Method
    public void menu(){
        System.out.println("***** Select What would You Like to Do ******");
        System.out.println("1. Check A/C Balance");
        System.out.println("2. Withdraw Money");
        System.out.println("3. Deposit Money");
        System.out.println("4. Exit");

        Scanner sc = new Scanner(System.in);
        int opt = sc.nextInt();

        if(opt==1){
            checkBalance();
        } else if (opt==2) {
            withdrawMoney();
        } else if (opt==3){
            depositMoney();
        } else if (opt==4){
            return;
        }else{
            System.out.println("Invalid Selection");
        }
    }

    // Method to Check Balance
    public void checkBalance(){
        System.out.println("Avl Bal :- "+ Balance);
        menu();
    }

    // Method to Withdraw Money
    public void withdrawMoney(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter WithDrawal Amount :- ");
        float amount = sc.nextInt();

        if(amount>Balance){
            System.out.println("Insufficient Balance");
        }else{
            Balance = Balance-amount;
            System.out.println("Money Withdrawn Successful");
        }
        menu();

    }

    // Method to Deposit Money
    public void depositMoney(){
        System.out.println("Enter Amount to Deposit :- ");
        Scanner sc = new Scanner(System.in);
        float deposit = sc.nextInt();
        System.out.println("Money Deposit Successfull");
        Balance=Balance+deposit;
        menu();

    }

}

public class AtmMachine {
    public static void main (String[] args){
        ATM obj = new ATM();
        obj.checkpin();
    }
}
