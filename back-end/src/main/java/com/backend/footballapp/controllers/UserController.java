package com.backend.footballapp.controllers;

import com.backend.footballapp.models.dtos.TokenDTO;
import com.backend.footballapp.models.forms.UserCreateForm;
import com.backend.footballapp.models.forms.UserLoginForm;
import com.backend.footballapp.services.implementation.CustomUserDetailsServiceImpl;
import com.backend.footballapp.tools.JWTProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {
    private final CustomUserDetailsServiceImpl userService;
    private final AuthenticationManager authenticationManager;
    private final JWTProvider jwtProvider;

    public UserController(CustomUserDetailsServiceImpl userService, AuthenticationManager authenticationManager, JWTProvider jwtProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/register")
    public void addUser(@Valid @RequestBody UserCreateForm form) {
        userService.addUser(form);
    }

    @PostMapping("/login")
    public TokenDTO login(@Valid @RequestBody UserLoginForm form){
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(form.getUsername(), form.getPassword()));
        return new TokenDTO(jwtProvider.createToken(auth));
    }
}
