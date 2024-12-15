Java sterday code

import java.util.*;
public class OneDarray{
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number of Employees :");
        int n = sc.nextInt();
        double salaries[] = new double[n];
        for(int i =0; i<n; i++){
            System.out.println("Enter the salary amount of employee"+ (i+1) + ":");
            double salary = sc.nextInt();
            salaries[i] = salary;
        }
        for(int i=0;i<=n;i++){
            double originalsal = salaries[i];
            double increment = 0;
            double bonus = 0;
            double hra = 0.1 * originalsal;
            double ta = 0.05 * originalsal;
            double da = 0.08 * originalsal;
            if(originalsal>= 30000){
                increment = 0.1 * originalsal;
                originalsal = originalsal + increment;
            }
            if(originalsal == 20000){
                bonus = 2000;
                originalsal = originalsal + bonus;
            }
            if(originalsal < 15000){
                System.out.println("You are Good now, But be best for higher salary");
            }
            System.out.println("Salary Details of Employee " + (i + 1) + ":");
            System.out.println("Original Salary: " + salaries[i]);
            System.out.println("Increment: " + increment);
            System.out.println("Bonus: " + bonus);
            System.out.println("HRA: " + hra);
            System.out.println("TA: " + ta);
            System.out.println("DA: " + da);
            System.out.println("Updated Salary: " + originalsal);
            System.out.println();
        }
       
    }
}