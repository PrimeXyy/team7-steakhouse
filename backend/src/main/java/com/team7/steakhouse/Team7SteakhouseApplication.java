package com.team7.steakhouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class Team7SteakhouseApplication {

	public static void main(String[] args) {
		SpringApplication.run(Team7SteakhouseApplication.class, args);
	}

}
