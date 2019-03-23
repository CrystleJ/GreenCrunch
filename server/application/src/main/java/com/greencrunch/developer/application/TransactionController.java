//package com.greencrunch.developer.application.controller;
package com.greencrunch.developer.application;

import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
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
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.Pageable;
 
import com.greencrunch.developer.application.Transaction;
import com.greencrunch.developer.application.Bank;
import com.greencrunch.developer.application.UserRepository;
import com.greencrunch.developer.application.TransactionRepository;


@RestController
//@RequestMapping("/transaction")
class TransactionController {

	@Autowired
    private TransactionRepository repository;
	private UserRepository userRepo;
	private BankRepository bankRepo;

	public static void main(String[] args) {
        SpringApplication.run(TransactionController.class, args);
    }

    public TransactionController(TransactionRepository repository, UserRepository userRepo, BankRepository bankRepo) {
        this.repository = repository;
		this.userRepo = userRepo;
		this.bankRepo = bankRepo;
    }
	
    @GetMapping("transaction/all/{email}")
    public List<Transaction> findAllByBankfk(@PathVariable String email) {

		System.out.println("Finding user with email: " + email);
        Optional<User> userOp = userRepo.findById(email);
		List<Transaction> transactions = new ArrayList<>();

		if(userOp.isPresent()) {
			User user = userOp.get();
			System.out.println("Found user: "+user);
			HashSet<Bank> banks = new HashSet<>(user.getBank());

			System.out.println("User's banks include: "+banks);
			int acctnum = banks.iterator().next().getAcctnum();
			System.out.println("Starting to find transactions by account number: "+acctnum);
			transactions = repository.findByBankAcctnum(acctnum);
			System.out.println("here: "+transactions);
			System.out.println("Number of transactions: "+transactions.size());

			for(int i =0; i < transactions.size(); i++) {
				System.out.println("Trying to print transaction for index: " + i);
				System.out.println(transactions.get(i));
				System.out.println("Hopefully printed transaction for index: " + i);
			}
			System.out.println("Finished finding transactions");
		}

		return transactions;
    }

	@GetMapping("transaction/bankacct/{email}")
    public Integer getBankAcct(@PathVariable String email) {
		int acctnum = 0;
		System.out.println("Finding user with email: " + email);
        Optional<User> userOp = userRepo.findById(email);
		List<Transaction> transactions = new ArrayList<>();

		if(userOp.isPresent()) {
			User user = userOp.get();
			System.out.println("Found user: "+user);
			HashSet<Bank> banks = new HashSet<>(user.getBank());

			System.out.println("User's banks include: "+banks);
			acctnum = banks.iterator().next().getAcctnum();
			System.out.println("The account number is: "+acctnum);
		}
		return acctnum;
    }

	@PostMapping(value = "/transaction/add/{acctnum}")
    public Transaction postTransaction(@PathVariable Integer acctnum, @RequestBody Transaction transaction) {
		System.out.println("Provided with transaction: "+transaction);
		System.out.println("Find bank: "+acctnum);
		Optional<Bank> bankOp = bankRepo.findById(acctnum);
		if(bankOp.isPresent()) {
			Bank bank = bankOp.get();
			System.out.println("Found bank: "+bank);
			System.out.println("Posting transaction: "+transaction);
			Transaction _transaction;
			_transaction = repository.save(new Transaction(transaction.getType(), transaction.getAmount(), transaction.getCategory(),transaction.getItem(),transaction.getDate_time(),bank));
			return _transaction;
		}
    
        return null;
    }

    @PutMapping("/transaction/update/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable("id") Integer id, @RequestBody Transaction transaction ){
        System.out.println("Finding transaction with id: " + id);
        Optional<Transaction> transactionOp = repository.findById(id);

		if(transactionOp.isPresent()) {
			Transaction _transaction = transactionOp.get();
			System.out.println("Found transaction: "+_transaction);
			_transaction.setType(transaction.getType());
			_transaction.setAmount(transaction.getAmount());
			_transaction.setCategory(transaction.getCategory());
			_transaction.setItem(transaction.getItem());
			_transaction.setDate_time(transaction.getDate_time());
			System.out.println("Updating transaction to: "+_transaction);
            return new ResponseEntity<>(repository.save(_transaction), HttpStatus.OK);
        } 
        System.out.println("Failed to find transaction with id: "+ id);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}