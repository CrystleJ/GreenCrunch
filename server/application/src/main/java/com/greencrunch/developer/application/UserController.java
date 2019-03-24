//package com.greencrunch.developer.application.controller;
package com.greencrunch.developer.application;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.boot.SpringApplication;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.stereotype.Controller;
 
import com.greencrunch.developer.application.User;
import com.greencrunch.developer.application.UserRepository;
import com.greencrunch.developer.application.Bank;
import com.greencrunch.developer.application.BankRepository;

import java.util.Set;
import java.util.HashSet;

@Controller
class UserController {

	@Autowired
    private UserRepository repository;
    private BankRepository bankRepo;

	public static void main(String[] args) {
        SpringApplication.run(UserController.class, args);
    }

    public UserController(UserRepository repository, BankRepository bankRepo) {
        this.repository = repository;
        this.bankRepo = bankRepo;
    }

    @PostMapping(value = "/user/create")
    public ResponseEntity<User> postUser(@RequestBody User user) {
        System.out.println("Posting user: "+user);
        Integer creditscore = 300 + (int)(Math.random() * (850 - 300));
        System.out.println("Credit score: "+creditscore);
        User _user;
        // _user = repository.save(new User(user.getEmail(), user.getFirstname(), user.getLastname(), user.getMiddlename()));
        return new ResponseEntity<>(repository.save(new User(user.getEmail(), user.getName(), creditscore)), HttpStatus.OK);
    }

    @PutMapping("/user/{email}")
    public ResponseEntity<Bank> updateUser(@PathVariable("email") String email, @RequestBody Bank bank ){//Acctnum num) {
        // Integer acctnum = num.getAcctNum();  
        System.out.println("Finding bank with account number: " + bank.getAcctnum());
        Optional<Bank> bankOp = bankRepo.findById(bank.getAcctnum());
        if(bankOp.isPresent()) {
            bank = bankOp.get();
            System.out.println("Finding user with email: " + email);
            Optional<User> userOp = repository.findById(email);

            if(userOp.isPresent()) {
                User user = userOp.get();
                System.out.println("Found user: "+user);
                System.out.println("Updating bank");
                bank.setUser(user);
                System.out.println("Bank updated: "+bank);
                return new ResponseEntity<>(bankRepo.save(bank), HttpStatus.OK);
            }
        } 
        System.out.println("Failed to find bank with account number: "+bank.getAcctnum());
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("user/check/{email}")
    @ResponseBody
    public boolean userExists(@PathVariable String email) {
		boolean exists = false;
		System.out.println("Finding user with email: " + email);
        Optional<User> userOp = repository.findById(email);

		if(userOp.isPresent()) {
			exists = true;
		}
		return exists;
    }

}