package com.kschang.rest.webservices.restfulwebservices;

public class SystemEnvironmentBean {

    private String profile;
    private String name;

	public SystemEnvironmentBean() {
		this.profile = System.getenv().get("SPRING_PROFILES_ACTIVE");
		this.name = System.getenv().get("SPRING_APPLICATION_NAME");	
	}

	public String getProfile() {
		return profile;
	}

	public String getName() {
		return name;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return String.format("System Env[Profile: %s, Application Name: %s]", profile, name);
	}

}
