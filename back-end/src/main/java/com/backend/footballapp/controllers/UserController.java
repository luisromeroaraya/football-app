package com.backend.footballapp.controllers;

import com.backend.footballapp.models.dtos.TokenDTO;
import com.backend.footballapp.models.dtos.UserDTO;
import com.backend.footballapp.models.forms.UserCreateForm;
import com.backend.footballapp.models.forms.UserLoginForm;
import com.backend.footballapp.models.forms.UserUpdateForm;
import com.backend.footballapp.services.implementation.CustomUserDetailsServiceImpl;
import com.backend.footballapp.tools.JWTProvider;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

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
    @ResponseStatus(HttpStatus.CREATED)
    public void createUser(@Valid @RequestBody UserCreateForm form) {
        userService.createUser(form);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public TokenDTO login(@Valid @RequestBody UserLoginForm form){
        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(form.getUsername(), form.getPassword()));
        return new TokenDTO(jwtProvider.createToken(auth));
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public List<UserDTO> readAll() {
        return userService.readAll();
    }

    @GetMapping("/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.OK)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public UserDTO readOne(@Valid @PathVariable Long id) {
        return userService.readOne(id);
    }

    @GetMapping("/profile")
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public UserDTO readProfile(Authentication authentication) {
        return userService.readProfile(authentication.getName());
    }

    @PatchMapping("/update/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.CREATED)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER", "ROLE_USER"})
    public UserDTO update(@Valid @PathVariable Long id, @Valid @RequestBody UserUpdateForm form) {
        return userService.update(id, form);
    }

    @DeleteMapping("/delete/{id:[0-9]+}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Secured({"ROLE_ADMIN", "ROLE_ORGANISER"})
    public void delete(@Valid @PathVariable Long id) {
        userService.delete(id);
    }
}
