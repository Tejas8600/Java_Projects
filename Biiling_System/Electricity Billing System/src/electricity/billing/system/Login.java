package electricity.billing.system;

import javax.swing.*; // Imported this package for JFrame.
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Login extends JFrame implements ActionListener {

    JTextField userText,passwordText; // Declared Globally

    Choice loginChoice; // Made for Dropdown Fields

    JButton loginButton,cancelButton,signupButton;

    Login(){
        super("Login Page"); // Rule of Java : Super keyword will always be 1st line of #CONSTRUCTOR....Heading of Page

        setLayout(null);// Set the layout to null to manually position components using setBounds.

        // Adjust background color of JFrame.
        getContentPane().setBackground(Color.lightGray);

        // Username LabelField
        JLabel username=new JLabel("UserName"); // JLabel : Used to print labels like UName etc text's on JFrame.
        username.setBounds(300,60,100,20 );
        add(username);

        // Username TextField
        userText = new JTextField();
        userText.setBounds(400,60,150,20);
        add(userText);


        // Password LabelField
        JLabel password = new JLabel("Password");
        password.setBounds(300,100,100,20); //setBounds to set Location.
        add(password);

        // Password TextField
        passwordText = new JTextField();
        passwordText.setBounds(400,100,150,20);
        add(passwordText);


        // Dropdown Selection
        JLabel loggin = new JLabel("Log in as");
        loggin.setBounds(300,140,100,20);
        add(loggin);

        loginChoice=new Choice();
        loginChoice.add("Admin"); // Admin and Customer are two entites to be display in dropdown.
        loginChoice.add("Customer");
        loginChoice.setBounds(400,140,150,20);
        add(loginChoice);


        // Login Button
        loginButton = new JButton("Login");
        loginButton.setBounds(330,180,100,20);
        loginButton.addActionListener(this);
        add(loginButton);

        // Cancel Button
        cancelButton = new JButton("Cancel");
        cancelButton.setBounds(460,180,100,20);
        cancelButton.addActionListener(this);
        add(cancelButton);

        // Signup LabelField
        JLabel signupName=new JLabel("Doesn't have Account?"); // JLabel : Used to print labels like UName etc text's on JFrame.
        signupName.setBounds(250,225,180,20 );
        signupName.setForeground(new Color(32, 112, 197));  // Set text color (blue)
        signupName.setFont(new Font("Arial", Font.BOLD, 14));  // Set font to Arial, Bold, size 14
        add(signupName);

        // Signup Button
        signupButton = new JButton("Signup");
        signupButton.setBounds(415,225,100,20);
        signupButton.addActionListener(this);
        add(signupButton);



        // Adding Profile Icon on Left hand side of Login Page.
        ImageIcon profileOne = new ImageIcon(ClassLoader.getSystemResource("icon/profile.png"));
        Image profileTwo = profileOne.getImage().getScaledInstance(250,250,Image.SCALE_DEFAULT);
        ImageIcon  fprofileOne = new ImageIcon(profileTwo);
        JLabel profileLabel = new JLabel(fprofileOne);
        profileLabel.setBounds(5,5,250,250);
        add(profileLabel);



        // JFrame Display Properties
        setSize(640,300);
        setLocation(400,200);
        setVisible(true);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); // Ensures the program exits when the window is closed
    }


    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource()==loginButton){

        } else if (e.getSource()==cancelButton) {
            setVisible(false); // If cancel Button then Closes the Login Form.

        } else if (e.getSource()==signupButton) {
            setVisible(false); // If Signup Button then Closes the Login Form.
            new Signup(); // Redirects to Signup Form

        }

    }

    public static void main(String[] args) {
        new Login();
    }
}
