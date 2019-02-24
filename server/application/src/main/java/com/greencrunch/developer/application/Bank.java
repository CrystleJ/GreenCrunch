//package com.greencrunch.developer.application.model;
package com.greencrunch.developer.application;

import lombok.*;
import javax.persistence.*;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.util.Date;
import java.util.Set;
import java.util.HashSet;

@Entity
@Getter @Setter
@NoArgsConstructor /// @EqualsAndHashCode <--- THIS THING CAN CAUSE THE INFINITE LOOP
@Table(name="Bank")
public class Bank implements Serializable {
    @Id
    private int acctnum;
    private Double checking;
    private Double savings;
    private Float card_number;

    //@OneToMany(cascade = CascadeType.ALL)
    //@JoinColumn(name = "bankfk", referencedColumnName="bankfk")
    @OneToMany(mappedBy = "bank", cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<Transaction> transactions = new HashSet();

    public Bank(int acctnum) {
        this.acctnum = acctnum;
    }

    // @ManyToOne
    // @JoinColumn(name = "user_fk")
    // private User user;
}