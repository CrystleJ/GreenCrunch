// //package com.greencrunch.developer.application.controller;
// package com.greencrunch.developer.application;

// import java.util.ArrayList;
// import java.util.List;
// import java.util.Optional;

// import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
// import org.springframework.boot.SpringApplication;
 
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import org.springframework.stereotype.Controller;
 
// import com.greencrunch.developer.application.User;
// import com.greencrunch.developer.application.UserRepository;

// @Controller
// @RequestMapping(path="/demo")
// class UserController {

// 	@Autowired
//     private UserRepository repository;

// 	public static void main(String[] args) {
//         SpringApplication.run(UserController.class, args);
//     }

//     public UserController(UserRepository repository) {
//         this.repository = repository;
//     }

//     /*
//     @RequestMapping(path="/all")
//     public List<User> findAllUsers() {
//         List<User> users = repository.findAll();
// 		System.out.println("here: "+users);
// 		System.out.println("Number of users: "+users.size());
// 		for(int i =0; i < users.size(); i++) {
// 			System.out.println("Trying to print users for index: " + i);
// 			System.out.println(users.get(i));
// 			System.out.println("Hopefully printed users for index: " + i);
// 		}
// 		System.out.println("Finished finding users");
// 		return users;
//     }*/

// }