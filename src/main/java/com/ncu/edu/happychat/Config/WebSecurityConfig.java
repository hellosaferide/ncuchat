package com.ncu.edu.happychat.Config;

import com.ncu.edu.happychat.entity.Users;
import com.ncu.edu.happychat.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

import javax.sql.DataSource;
import java.util.ArrayList;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    @Qualifier("dataSource")
    private DataSource dataSource;

    @Autowired
    private UsersService usersService;

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        ArrayList<Users> userList = (ArrayList<Users>) usersService.findAll();
        for(Users users:userList){
            auth.inMemoryAuthentication()
                    .withUser(users.getUserName()).password(users.getUserPassword()).roles("ADMIN");
        }
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/index","/register","/findFriendImpression").permitAll()//1根路径和/index路径不拦截
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/index") //2登陆页面
                .defaultSuccessUrl("/chat1") //3登陆成功转向该页面
                .permitAll()
                .and()
                .logout()
                .logoutSuccessUrl("/index")  //退出登录后的默认url是"/index"
                .permitAll();
    }

    //5忽略静态资源的拦截
    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/css/**","/js/**","/resource/**");
    }



    /*@Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder(11);
    }*/

    @Bean
    public static NoOpPasswordEncoder passwordEncoder() {
        return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
    }

}