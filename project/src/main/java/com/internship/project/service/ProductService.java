package com.internship.project.service;

import com.internship.project.entity.Product;
import com.internship.project.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repo;

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product addProduct(Product product) {
        return repo.save(product);
    }

    public Optional<Product> updateProduct(Long id, Product updated) {
        return repo.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setQuantity(updated.getQuantity());
            existing.setReorderThreshold(updated.getReorderThreshold());
            return repo.save(existing);
        });
    }

    public boolean deleteProduct(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return true;
        }
        return false;
    }
}