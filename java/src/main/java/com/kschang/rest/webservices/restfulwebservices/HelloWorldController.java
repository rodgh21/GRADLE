package com.kschang.rest.webservices.restfulwebservices;

import com.kschang.rest.webservices.restfulwebservices.environment.InstanceEnvironmentService;
import com.kschang.rest.webservices.restfulwebservices.environment.InstanceInformationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {
	
	@Autowired
	private InstanceInformationService infoService;

	@Autowired
	private InstanceEnvironmentService envService;

	@GetMapping(path = "/")
	public String imUpAndRunning() {
		return "{healthy:true}";
	}
	
	@GetMapping(path = "/hello-world")
	public String helloWorld() {
		return "Hello World from ExclamationMark™" + " V2 " + infoService.retrieveInstanceInfo();
	}

	@GetMapping(path = "/hello-world-bean")
	public HelloWorldBean helloWorldBean() {
		return new HelloWorldBean("Hello World from ExclamationMark™");
	}

	@GetMapping(path = "/default-env")
	public String defaultEnv() {
		return "Spring Profiles: " + envService.retrieveEnvInfo();
	}

	@GetMapping(path = "/system-env-bean")
	public String systemEnvBean() {
		SystemEnvironmentBean sysEnvBean = new SystemEnvironmentBean();
		return sysEnvBean.toString();
	}

	/// hello-world/path-variable/kschang
	@GetMapping(path = "/hello-world/path-variable/{name}")
	public HelloWorldBean helloWorldPathVariable(@PathVariable String name) {
		return new HelloWorldBean(String.format("Hello World from ExclamationMark™, %s", name));
	}
}
