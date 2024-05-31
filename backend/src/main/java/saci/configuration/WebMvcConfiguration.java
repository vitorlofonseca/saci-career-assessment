package saci.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration {

    @Value("${CORS_URL_CLIENT:http://localhost:8081}")
    private String corsUrlClient;

    @Value("${CORS_URL_ADMIN:http://localhost:8082}")
    private String corsUrlAdmin;

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {

                registry.addMapping("/**")
                        .allowedMethods("GET", "POST")
                        .allowedOrigins(corsUrlClient);


                registry.addMapping("/admin/**").allowedMethods("*").allowedOrigins(corsUrlAdmin);
            }
        };
    }
}
