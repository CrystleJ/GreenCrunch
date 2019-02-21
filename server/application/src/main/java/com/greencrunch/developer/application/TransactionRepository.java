//package com.greencrunch.developer.application.repo;
package com.greencrunch.developer.application;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
 
import org.springframework.data.repository.CrudRepository;
 
import com.greencrunch.developer.application.Transaction;

@RepositoryRestResource
@CrossOrigin(origins = "http://localhost:4200")
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
	//List<Transaction> getAllTransactions(int account_number);

	//@Query("SELECT t from Transactions t where t.account_number = ?1")
	List<Transaction> findAllByBank_Acctnum(int acctnum);

}