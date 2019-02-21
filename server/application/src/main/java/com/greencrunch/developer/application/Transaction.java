//package com.greencrunch.developer.application.model;
package com.greencrunch.developer.application;

import java.io.Serializable;
import lombok.*;
import javax.persistence.*;

import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString @EqualsAndHashCode
@Table(name="Transactions")
public class Transaction implements Serializable{
    @Id 
    private int id;
    private @NonNull String type;
    private @NonNull Double amount;
    private @NonNull String category;
    private @NonNull String item;
    private @NonNull Date   date_time;

    @ManyToOne
    @JoinColumn(name = "bank_fk")
    private Bank bank;
}