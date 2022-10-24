package com.backend.footballapp.mappers;

import com.backend.footballapp.models.dtos.UserDTO;
import com.backend.footballapp.models.entities.User;
import com.backend.footballapp.models.forms.UserCreateForm;
import com.backend.footballapp.models.forms.UserUpdateForm;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserDTO toDto(User entity) {
        if (entity == null)
            return null;
        return UserDTO.builder()
                .id(entity.getId())
                .username(entity.getUsername())
                .enabled(entity.isEnabled())
                .roles(entity.getRoles())
                .build();
    }

    public User toEntity(UserCreateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        return user;
    }

    public User toEntity(UserUpdateForm form) {
        User user = new User();
        user.setUsername(form.getUsername());
        user.setPassword(form.getPassword());
        user.setEnabled(form.isEnabled());
        return user;
    }
}
