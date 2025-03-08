package com.Spring.ecom_proj.controller;

import com.Spring.ecom_proj.model.Product;
import com.Spring.ecom_proj.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin // TO connect frontend and backend which are running on different PORTS.
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return new ResponseEntity<>(service.getAllProducts(),HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id){
        Product product = service.getProductById(id);
        if(product != null){
        return new ResponseEntity<>(product,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/product")
//    "@RequestBody" accepts the whole json while "@RequestPart" accepts some of the part.
    public ResponseEntity<?>addProduct(@RequestPart Product product,
                                       @RequestPart MultipartFile imageFile) {
        try {
            Product product1 = service.addProduct(product, imageFile);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    Method to get image
    @GetMapping("/product/{productId}/image")
    public ResponseEntity<byte[]> getImageByProductId (@PathVariable int productId){
        Product product = service.getProductById(productId);
        byte[] imageFile = product.getImageData();
        return ResponseEntity.ok()
                .contentType(MediaType.valueOf(product.getImageType()))
                .body(imageFile);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduc (@PathVariable int id,
                                                @RequestPart Product product,
                                                @RequestPart MultipartFile imageFile){
        try {
            Product product1 = service.updateProduct(id,product,imageFile);
        } catch (IOException e) {
            return new ResponseEntity<>("Error",HttpStatus.BAD_REQUEST);
        }
        if(product != null){
            return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
        }else{return new ResponseEntity<>("Error",HttpStatus.BAD_REQUEST);}
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product product = service.getProductById(id);
        if(product != null){
            service.deleteProduct(id);
            return new ResponseEntity<>("Deleted Successfully",HttpStatus.OK);
        }else{return new ResponseEntity<>("Product Not Found",HttpStatus.NOT_FOUND);}
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts (@RequestParam String keyword){
        System.out.println("Searching With :- "+ keyword);
        List<Product> products = service.searchProducts(keyword);
        return new  ResponseEntity<>(products,HttpStatus.OK);
    }
}
