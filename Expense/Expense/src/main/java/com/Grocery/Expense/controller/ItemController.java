package com.Grocery.Expense.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final List<Map<String, Object>> items = new ArrayList<>();

    // ✅ GET all items
    @GetMapping
    public List<Map<String, Object>> getItems() {
        return items;
    }

    // ✅ ADD item
    @PostMapping
    public Map<String, Object> addItem(@RequestBody Map<String, Object> item) {
        item.put("id", (long) (items.size() + 1)); // give id
        items.add(item);
        return item;
    }

    // ✅ DELETE item
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        items.removeIf(i -> i.get("id").equals(id));
    }
}