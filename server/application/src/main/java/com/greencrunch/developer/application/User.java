//package com.greencrunch.developer.application.model;
package com.greencrunch.developer.application;

import lombok.*;
import javax.persistence.*;
import java.io.Serializable;

import java.util.Date;
import java.util.Set;
import java.util.HashSet;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
@Table(name="Users")
public class User implements Serializable{
    @Id 
    private @NonNull int id;
    private String first_name;
    private String last_name;
    private String middle_name;
    private String street_address;
    private String city_address;
    private String state_address;
    private Integer zipcode_address;
    private String phone_number;
    private Integer credit_score;
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    Set<Bank> bank = new HashSet();

    public String getFullName() {
        if(middle_name != null) {
            return first_name + " " + middle_name + " " + last_name;
        } 
        return first_name + " " + last_name;
    }

    public String getFullAddress() {
        return street_address + ", " + city_address + ", " + state_address + " " + zipcode_address;
    }
}