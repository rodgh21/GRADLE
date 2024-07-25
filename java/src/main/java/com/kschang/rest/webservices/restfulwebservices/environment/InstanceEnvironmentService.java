package com.kschang.rest.webservices.restfulwebservices.environment;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class InstanceEnvironmentService {

	@Value("${spring.application.name}")
    private String name;

	@Value("${spring.datasource.username}")
    private String dbUserName;

	@Value("${spring.datasource.password}")
    private String dbPassword;

	public String retrieveEnvInfo() {
		return String.format("[Application Name: %s, Datasource Username: %s, Datasource Password: %s]", name, dbUserName, dbPassword);
	}

}