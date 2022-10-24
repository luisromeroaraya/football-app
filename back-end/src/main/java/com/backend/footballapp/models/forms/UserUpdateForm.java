package com.backend.footballapp.models.forms;

import lombok.Data;

@Data
public class UserUpdateForm {
    private String username;
    private String password;
    private boolean enabled;
}
