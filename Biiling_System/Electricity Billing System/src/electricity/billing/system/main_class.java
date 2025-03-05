package electricity.billing.system;

import javax.swing.*;
import java.awt.*;

public class main_class extends JFrame {

    main_class() // Constructer same as class name.
    {
        setExtendedState(JFrame.MAXIMIZED_BOTH); // Returns the Frame according to Your Screen (FUllsize).

// Setting Up BackGround Image.
        ImageIcon imageIcon = new ImageIcon(ClassLoader.getSystemResource("icon/ebs.jpg"));
        Image image = imageIcon.getImage().getScaledInstance(1530,830,Image.SCALE_DEFAULT);
        ImageIcon imageIcon2 = new ImageIcon(image);
        JLabel imageLable = new JLabel(imageIcon2);
        add(imageLable);

// Setting Up MenuBar
         JMenuBar menuBar = new JMenuBar(); // "JMenuBar" Creates menu bar.
         setJMenuBar(menuBar);

        JMenu menu = new JMenu("Menu"); // "JMenu" Enters the Fields in MenuBar
        menu.setFont(new Font("serif",Font.PLAIN,15 ));
        menuBar.add(menu); // adds menu in menubar.

        JMenuItem newcustomer = new JMenuItem("New Customer"); // "JMenuItem" MenuFields inside the fields of MenuBar
        newcustomer.setFont(new Font("monospaced",Font.PLAIN,14));
        menu.add(newcustomer);



        setLayout(new FlowLayout());
        setVisible(true);

    }

    public static void main (String[] args){

        new main_class();
    }
}
