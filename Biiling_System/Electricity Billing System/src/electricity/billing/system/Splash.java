package electricity.billing.system;

import javax.swing.*; // Imported this package for JFrame.
import java.awt.*;

public class Splash extends JFrame  {
    Splash(){
        ImageIcon imageIcon = new ImageIcon (ClassLoader.getSystemResource ("icon/Splash/Splash.jpg"));//Electricity Billing System/src/icon/Splash/Splash.jpg
        Image imageOne= imageIcon.getImage().getScaledInstance(500,500,Image.SCALE_DEFAULT);
        ImageIcon imageIcon2 = new ImageIcon(imageOne);
        JLabel imageLabel = new JLabel(imageIcon2);
        add(imageLabel);

        setSize(400,400);
        setLocation(500,200);
        //setLayout(null);
        setVisible(true);

        try{
            Thread.sleep(3000); // Setting 3sec of time to close the Splash.
            setVisible(false) ;
            new Login();

        }catch(Exception e){
            e.printStackTrace();
        }

    }
    public static void main(String[] args) {
        new Splash();
    }
}
