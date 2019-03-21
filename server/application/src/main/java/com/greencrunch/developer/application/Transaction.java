//package com.greencrunch.developer.application.model;
package com.greencrunch.developer.application;

import java.io.Serializable;
import lombok.*;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.util.Date;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString /// @EqualsAndHashCode <--- THIS THING CAN CAUSE THE INFINITE LOOP
public class Transaction implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) 
    private int id;
    private @NonNull String type;
    private @NonNull Double amount;
    private @NonNull String category;
    private @NonNull String item;
    private @NonNull Date   date_time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    @JoinColumn(name = "bank_acctnum")
    private Bank bank;

    public Transaction(String type, Double amount, String category, String item, Date date_time) {
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.item = item;
        this.date_time = date_time;
    }

    public Transaction(String type, Double amount, String category, String item, Date date_time, Bank bank) {
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.item = item;
        this.date_time = date_time;
        this.bank = bank;
    }
}