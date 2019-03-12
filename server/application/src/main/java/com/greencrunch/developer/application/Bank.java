//package com.greencrunch.developer.application.model;
package com.greencrunch.developer.application;

import lombok.*;
import javax.persistence.*;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;

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

    @OneToMany(mappedBy = "bank", cascade = CascadeType.ALL)
    @JsonManagedReference
    Set<Transaction> transactions = new HashSet();

    public Bank(int acctnum) {
        this.acctnum = acctnum;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "user_email")
    private User user;
}