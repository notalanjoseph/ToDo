package com.example.ToDoJava.controllers;

import com.example.ToDoJava.dto.UserDto;
import com.example.ToDoJava.entities.User;
import com.example.ToDoJava.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public UserDto createUser(@RequestBody User user) {
        return userService.createUser(user.getEmail(), user.getPassword());
    }
}