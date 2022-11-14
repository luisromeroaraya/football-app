package com.backend.footballapp.models.entities;

import com.backend.footballapp.enums.Country;
import com.backend.footballapp.enums.Position;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.time.LocalDate;

@Embeddable
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    private String displayName;
    private String mail;
    private String userPic;
    private Position position;
    private Long shirtNumber;
    private Country country;
    private LocalDate birthDate;
    private String phoneNumber;
    private String bio;
}
