package com.example.cardapio.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cardapio.entities.Food;
import com.example.cardapio.entities.FoodRequestDTO;
import com.example.cardapio.entities.FoodResponseDTO;
import com.example.cardapio.repositories.FoodRepository;

@RestController
@RequestMapping("food")
public class FoodController {
    
    @Autowired
    private FoodRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public ResponseEntity<List<FoodResponseDTO>> findAll() {
        List<FoodResponseDTO> result = repository.findAll().stream().map(FoodResponseDTO::new).toList();
        return ResponseEntity.ok(result);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public ResponseEntity<Food> saveFood(@RequestBody FoodRequestDTO data) {
        Food food = new Food(data);
        repository.save(food);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    

}
