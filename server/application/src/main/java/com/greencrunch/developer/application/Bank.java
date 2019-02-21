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
@Table(name="Bank")
public class Bank implements Serializable{
    @Id 
    private int acctnum;
    private @NonNull Double checking;
    private Double savings;
    private @NonNull Float card_number;

    @OneToMany(mappedBy = "bank", cascade = CascadeType.ALL)
    Set<Transaction> transactions = new HashSet();

    @ManyToOne
    @JoinColumn(name = "user_fk")
    private User user;
}