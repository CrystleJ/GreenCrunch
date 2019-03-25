//package com.greencrunch.developer.application.model;
package com.greencrunch.developer.application;

import lombok.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;
import java.io.Serializable;

import java.util.Date;
import java.util.Set;
import java.util.HashSet;
import org.json.JSONObject;

import com.greencrunch.developer.application.Bank;


@Entity
@Getter @Setter
@NoArgsConstructor
@ToString // @EqualsAndHashCode
@Table(name="User")
public class User implements Serializable{
    @Id 
    private @NonNull String email;
    private @NonNull String name;
    // private @NonNull String firstname;
    // private @NonNull String lastname;
    // private String middlename;
    private Integer creditscore;
    private String budget;
    // private String street_address;
    // private String city_address;
    // private String state_address;
    // private Integer zipcode_address;
    // private String phone_number;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<Bank> bank = new HashSet();

    // public String getFullName() {
    //     if(middlename != null) {
    //         return firstname + " " + middlename + " " + lastname;
    //     } 
    //     return firstname + " " + lastname;
    // }

    public User(String email, String name, Integer creditscore, String budget) {
        this.email = email;
        this.name = name;
        this.creditscore = creditscore;
        this.budget = budget;
    } 

}