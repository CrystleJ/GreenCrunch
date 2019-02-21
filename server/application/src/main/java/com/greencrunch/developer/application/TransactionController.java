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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
 
import com.greencrunch.developer.application.Transaction;
import com.greencrunch.developer.application.TransactionRepository;


@RestController
//@RequestMapping("/transaction")
class TransactionController {

	//private int account_number = 84673428;

	@Autowired
    private TransactionRepository repository;

	public static void main(String[] args) {
        SpringApplication.run(TransactionController.class, args);
    }

    public TransactionController(TransactionRepository repository) {
        this.repository = repository;
    }

	/*
	@Bean
	@SuppressWarnings("unchecked")
	public FilterRegistrationBean simpleCorsFilter() {
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowCredentials(true);
		config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
		config.setAllowedMethods(Collections.singletonList("*"));
		config.setAllowedHeaders(Collections.singletonList("*"));
		source.registerCorsConfiguration("/**", config);
		FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
		bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
		return bean;
	}*/
	
    @GetMapping("transaction/all/{acctnum}")
	//@CrossOrigin(origins = "http://localhost:4200")
    public List<Transaction> findAllByAcctnum(@PathVariable int acctnum) {
		System.out.println("Starting to find transactions by account number: "+acctnum);
        List<Transaction> transactions = repository.findAllByBank_Acctnum(acctnum);
		System.out.println("here: "+transactions);
		System.out.println("Number of transactions: "+transactions.size());
		for(int i =0; i < transactions.size(); i++) {
			System.out.println("Trying to print transaction for index: " + i);
			System.out.println(transactions.get(i));
			System.out.println("Hopefully printed transaction for index: " + i);
		}
		System.out.println("Finished finding transactions");
		return transactions;
    }

    /* TODO : UPDATE TRANSACTION */
    /*
    @PutMapping("/transaction/{id}")
	public ResponseEntity<Customer> updateCustomer(@PathVariable("id") long id, @RequestBody Transaction transaction) {
		System.out.println("Update transaction with ID = " + id + "...");
 
		Optional<Transaction> transactionData = repository.findById(id);
 
		if (transactionData.isPresent()) {
			Customer _transaction = transactionData.get();
			_transaction.setName(transaction.getName());
			_transaction.setAge(transaction.getAge());
			_transaction.setActive(transaction.isActive());
			return new ResponseEntity<>(repository.save(_transaction), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
    */

}