package com.Spring.ecom_proj.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.id.factory.internal.AutoGenerationTypeStrategy;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id //Specifing Id as Primary Key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Autogenerating ID
    private int id;
    private String name;
    private String description;
    private String brand;
    private BigDecimal price;
    private String category;

    //    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
    private Date releaseDate;
    private String productAvailable;
    private int stockQuantity;

    //    3 things for Image
    private String imageName;
    private String imageType;

    //    "LOB" Used to strore large object in "byte[]".
    @Lob
    private byte[] imageData;

}
