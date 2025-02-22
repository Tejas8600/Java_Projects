package electricity.billing.system;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.ItemEvent;
import java.awt.event.ItemListener;

public class Signup extends JFrame implements ActionListener {

    // Declared Globally
    Choice loginASCho;
    TextField meterText, EmployerText, userNameText, nameText, passwordText;
    JButton create, back;

    Signup() {

        super("Signup Page");

        // Adjust background color of JFrame
        getContentPane().setBackground(new Color(168, 203, 255));

        // Create Account as LabelField
        JLabel createAs = new JLabel("Create Account As");
        createAs.setBounds(30, 50, 125, 20); //setBounds to set Location.
        add(createAs);

        // Create Account as Dropdown
        loginASCho = new Choice();
        loginASCho.add("Admin"); // On writing Admin as 1st By default Dropdown will show "Admin".
        loginASCho.add("Customer");
        loginASCho.setBounds(170, 50, 120, 20);
        add(loginASCho);

        // Meter No. LabelField
        JLabel meterNo = new JLabel("Meter No.");
        meterNo.setBounds(30, 100, 125, 25);
        meterNo.setVisible(false);
        add(meterNo);

        // Meter No. TextField
        meterText = new TextField();
        meterText.setBounds(170, 100, 125, 25);
        meterText.setVisible(false);
        add(meterText);

        // Employee ID LabelField
        JLabel Employer = new JLabel("Employee ID");
        Employer.setBounds(30, 100, 125, 25);
        Employer.setVisible(true); // Visibility is true because by default Admin is Selected.
        add(Employer);

        // Employee ID TextField
        EmployerText = new TextField();
        EmployerText.setBounds(170, 100, 125, 25);
        EmployerText.setVisible(true);
        add(EmployerText);

        // UserName LabelField
        JLabel userName = new JLabel("UserName");
        userName.setBounds(30, 150, 125, 20);
        add(userName);

        // UserName TextField
        userNameText = new TextField();
        userNameText.setBounds(170, 145, 125, 25);
        add(userNameText);

        // Name LabelField
        JLabel name = new JLabel("Name");
        name.setBounds(30, 190, 125, 20);
        add(name);

        // Name TextField
        nameText = new TextField();
        nameText.setBounds(170, 190, 125, 25);
        add(nameText);

        // Password LabelField
        JLabel password = new JLabel("Password");
        password.setBounds(30, 230, 125, 25);
        add(password);

        // Password TextField
        passwordText = new TextField();
        passwordText.setBounds(170, 235, 125, 25);
        add(passwordText);

        // ItemListener is created to the field as Employee if "Admin" selected OR Meter no. if "Customer" Selected.
        loginASCho.addItemListener(new ItemListener() {
            @Override
            public void itemStateChanged(ItemEvent e) {
                String user = loginASCho.getSelectedItem();
                if (user.equals("Customer")) {
                    Employer.setVisible(false);
                    EmployerText.setVisible(false);
                    meterNo.setVisible(true);
                    meterText.setVisible(true);
                } else {
                    Employer.setVisible(true);
                    EmployerText.setVisible(true);
                    meterNo.setVisible(false);
                    meterText.setVisible(false);
                }
            }
        });

        // Create Button
        create = new JButton("Create");
        create.setBackground(new Color(56, 142, 255)); // Set the background color to blue.
        create.setFont(new Font("Arial", Font.BOLD, 14)); // Set font style
        create.setForeground(Color.white); // Set the text color to Black.
        create.setBounds(50, 290, 100, 25);
        create.setUI(new javax.swing.plaf.metal.MetalButtonUI()); // Non-default UI for a customized look.
        create.addActionListener(this); // ActionListener for the button
        add(create);

        // Back Button
        back = new JButton("Back");
        back.setBackground(new Color(56, 142, 255)); // Set the background color to blue.
        back.setFont(new Font("Arial", Font.BOLD, 14)); // Set font style
        back.setForeground(Color.white); // Set the text color to Black.
        back.setBounds(190, 290, 100, 25);
        back.setUI(new javax.swing.plaf.metal.MetalButtonUI()); // Non-default UI for a customized look.
        back.addActionListener(this); // ActionListener for the button
        add(back);

        // Image Icon On Right hand side of Signup Form
        ImageIcon boyIcon = new ImageIcon(ClassLoader.getSystemResource("icon/boy.png"));
        Image boyImg = boyIcon.getImage().getScaledInstance(250, 250, Image.SCALE_DEFAULT);
        ImageIcon boyIcon2 = new ImageIcon(boyImg);
        JLabel boyLabel = new JLabel(boyIcon2);
        boyLabel.setBounds(330, 40, 250, 250);
        add(boyLabel);

        setSize(600, 380);
        setLocation(500, 200);
        setLayout(null);
        setVisible(true);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        // Handling button clicks
        if (e.getSource() == create) {

            // Saving User entered values from Signup form to database.
            String sloginAs = loginASCho.getSelectedItem();
            String susername = userNameText.getText();
            String sname = nameText.getText();
            String spassword = passwordText.getText();
            String smeter = meterText.getText();


            try {
                database c = new database();
                String query = null;
                query = "insert into Signup value('"+smeter+"','"+susername+"','"+sname+"','"+spassword+"','"+sloginAs+"')";

                // To execute the query
                c.statement.executeUpdate(query);
                
                // Displays dialogue box after User submitted req.
                JOptionPane.showMessageDialog(null,"Account Created");
                setVisible(false);
                new Login();

            }catch (Exception E){
                E.printStackTrace();
            }

//            // Collect values from text fields
//            String username = userNameText.getText();
//            String name = nameText.getText();
//            String password = passwordText.getText();
//            String userType = ((Choice) getComponentAt(170, 50)).getSelectedItem();
//
//            if (userType.equals("Admin")) {
//                String empId = EmployerText.getText();
//                // Logic for Admin creation (You can add database logic or save to a file)
//                System.out.println("Admin account created: " + username + ", " + name + ", " + empId + ", " + password);
//            } else if (userType.equals("Customer")) {
//                String meterNo = meterText.getText();
//                // Logic for Customer creation (You can add database logic or save to a file)
//                System.out.println("Customer account created: " + username + ", " + name + ", " + meterNo + ", " + password);
//            }

        } else if (e.getSource() == back) {
            setVisible(false);
            new Login();  // Navigate back to login page
        }
    }

    public static void main(String[] args) {
        new Signup();
    }
}



//***** MY ******

//package electricity.billing.system;
//
//import org.w3c.dom.Text;
//
//import javax.swing.*; // Imported this package for JFrame.
//import java.awt.*;
//import java.awt.event.ActionEvent;
//import java.awt.event.ActionListener; // Implementing for Onclick Events.
//import java.awt.event.ItemEvent;
//import java.awt.event.ItemListener;
//
//public class Signup extends JFrame implements ActionListener {    // Implementing ActionListener  for Onclick Events.
//    Signup(){
//
//        super("Signup Page");
//
//        // Adjust background color of JFrame.
//        getContentPane().setBackground(new Color(168,203,255));
//
//        // Declared Globally
//        Choice loginASCho;
//        TextField meterText,EmployerText,userNameText,nameText,passwordText;
//        JButton create,back;
//
//
//        // Create Account as LabelField
//        JLabel createAs = new JLabel("Create Account As");
//        createAs.setBounds(30,50,125,20); //setBounds to set Location.
//        add(createAs);
//
//        // Create Account as Dropdown
//        loginASCho = new Choice();
//        loginASCho.add("Admin"); // On writing Admin as 1st By default Dropdown will show "Admin".
//        loginASCho.add("Customer");
//        loginASCho.setBounds(170,50,120,20);
//        add(loginASCho);
//
//
//
//        // Meter No. LabelField
//        JLabel meterNo = new JLabel("Meter No.");
//        meterNo.setBounds(30,100,125,25);
//        meterNo.setVisible(false);
//        add(meterNo);
//
//        //Meter No. TextField
//        meterText = new TextField();
//        meterText.setBounds(170,100,125,25);
//        meterText.setVisible(false);
//        add(meterText);
//
//
//
//        // Employee ID LabelField
//        JLabel Employer = new JLabel("Employee ID");
//        Employer.setBounds(30,100,125,25);
//        Employer.setVisible(true);// Visibility is true because by default Admin is Selected.
//        add(Employer);
//
//        // Employee ID TextField
//        EmployerText = new TextField();
//        EmployerText.setBounds(170,100,125,25);
//        EmployerText.setVisible(true);
//        add(EmployerText);
//
//
//
//        // UserName LabelField
//        JLabel userName = new JLabel("UserName");
//        userName.setBounds(30,150,125,20);
//        add(userName);
//
//        // UserName TextField
//        userNameText = new TextField();
//        userNameText.setBounds(170,145,125,25);
//        add(userNameText);
//
//
//
//        // Name LabelField
//        JLabel name = new JLabel("Name");
//        name.setBounds(30,190,125,20);
//        add(name);
//
//        // Name TextField
//        nameText = new TextField();
//        nameText.setBounds(170,190,125,25);
//        add(nameText);
//
//
//
//        // Password LabelField
//        JLabel password = new JLabel("Password");
//        password.setBounds(30,230,125,25);
//        add(password);
//
//        // Password TextField
//        passwordText = new TextField();
//        passwordText.setBounds(170,235,125,25);
//        add(passwordText);
//
//
//
//        // ItemListener is created to the field as Employee if "Admin" selected OR Meter no. if "Customer" Selected.
//        loginASCho.addItemListener(new ItemListener() {
//            @Override
//            public void itemStateChanged(ItemEvent e) {
//                String user = loginASCho.getSelectedItem();
//                if(user.equals("Customer")){
//                    Employer.setVisible(false);
//                    EmployerText.setVisible(false);
//                    meterNo.setVisible(true);
//                    meterText.setVisible(true);
//                }else {
//                    Employer.setVisible(true);
//                    EmployerText.setVisible(true);
//                    meterNo.setVisible(false);
//                    meterText.setVisible(false);
//                }
//            }
//        });
//
//
//
//        // Create Button
//        create = new JButton("Create");
//        create.setBackground(new Color(56, 142, 255)); // Set the background color to blue.
//        create.setFont(new Font("Arial", Font.BOLD, 14)); // Set font style
//        create.setForeground(Color.white); // Set the text color to Black.
//        create.setBounds(50,290,100,25);
//        create.setUI(new javax.swing.plaf.metal.MetalButtonUI()); //Make sure the button has a non-default UI for a customized look.
//        create.addActionListener(this); // To Let it know that this button is clicked.
//        add(create);
//
//
//
//        // Back Button
//        back = new JButton("Back");
//        back.setBackground(new Color(56, 142, 255)); // Set the background color to blue.
//        back.setFont(new Font("Arial", Font.BOLD, 14)); // Set font style
//        back.setForeground(Color.white); // Set the text color to Black.
//        back.setBounds(190,290,100,25);
//        back.setUI(new javax.swing.plaf.metal.MetalButtonUI()); //Make sure the button has a non-default UI for a customized look.
//        back.addActionListener(this);
//        add(back);
//
//
//
//        //Image Icon On Right hand side of Signup Form.
//        ImageIcon boyIcon = new ImageIcon(ClassLoader.getSystemResource("icon/boy.png"));
//        Image boyImg = boyIcon.getImage().getScaledInstance(250,250,Image.SCALE_DEFAULT);
//        ImageIcon boyIcon2 = new ImageIcon(boyImg);
//        JLabel boyLabel = new JLabel(boyIcon2);
//        boyLabel.setBounds(330,40,250,250);
//        add(boyLabel);
//
//
//
//
//        setSize(600,380);
//        setLocation(500,200);
//        setLayout(null);
//        setVisible(true);
//
//        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//    }
//
//
//    @Override
//    public void actionPerformed(ActionEvent e) {   // The button clicked above is saved in "e" .
//        if(e.getSource() == create){
//
//        } else if (e.getSource() == back) {
//            setVisible(false);
//            new Login();
//        }
//
//    }
//
//    public static void main(String[] args) {
//        new Signup();
//
//    }
//}
//
