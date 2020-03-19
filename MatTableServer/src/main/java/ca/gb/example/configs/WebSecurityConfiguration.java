package ca.gb.example.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/v2/api-docs",
                                   "/configuration/ui",
                                   "/swagger-resources/**",
                                   "/configuration/security",
                                   "/swagger-ui.html",
                                   "/webjars/**");
    }

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
			.authorizeRequests()
				.antMatchers(HttpMethod.GET, "/api/**").permitAll()
				.antMatchers(HttpMethod.POST, "/api/**").permitAll()
				.antMatchers(HttpMethod.DELETE, "/api/**").permitAll()
				.antMatchers("/user/**").hasRole("USER")			
				.and()
				.cors().and()
				.csrf().disable()
			.formLogin()
				.loginPage("/login").failureUrl("/login-error");	
	}
    
}
