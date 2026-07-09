package com.smartorder.backend.config;

import com.smartorder.backend.entity.Product;
import com.smartorder.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ProductDataLoader implements CommandLineRunner {

    private final ProductRepository productRepository;

    public ProductDataLoader(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (productRepository.count() == 0) {
            List<Product> products = List.of(
                    new Product("Laptop", "Electronics", 1200, 15, "💻"),
                    new Product("Phone", "Electronics", 800, 25, "📱"),
                    new Product("Headphones", "Accessories", 150, 40, "🎧"),
                    new Product("Keyboard", "Accessories", 90, 30, "⌨️"),
                    new Product("Mouse", "Accessories", 50, 35, "🖱️"),
                    new Product("Monitor", "Electronics", 300, 12, "🖥️")
            );

            productRepository.saveAll(products);

            System.out.println("Sample products inserted into database.");
        } else {
            System.out.println("Products already exist. Skipping product insert.");
        }
    }
}