package com.backend.footballapp.models.entities;

import com.backend.footballapp.enums.Country;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;

@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    private String phoneNumber = "";
    private Country nationality = Country.BE;
    private String userPic = "";
}
