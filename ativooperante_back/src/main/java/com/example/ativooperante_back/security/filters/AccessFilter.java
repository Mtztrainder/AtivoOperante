package com.example.ativooperante_back.security.filters;

import java.io.IOException;

import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ativooperante_back.db.entidades.Usuario;
import com.example.ativooperante_back.security.JWTTokenProvider;

import io.jsonwebtoken.Claims;
import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@CrossOrigin
public class AccessFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
                
        HttpServletRequest req = (HttpServletRequest) request;
        String token = req.getHeader("Authorization"); 
        
        if (req.getMethod().equals("OPTIONS")){
            chain.doFilter(request, response);
        }else{

            if(token!=null && JWTTokenProvider.verifyToken(token))
            {   
                Claims claims=JWTTokenProvider.getAllClaimsFromToken(token);
                int nivel = (Integer) claims.get("nivel");
                int id = (Integer) claims.get("id");
                String nome = (String)claims.get("nome");
                request.setAttribute("nivel", nivel);
                request.setAttribute("id", id);
                request.setAttribute("nome", nome);
                chain.doFilter(request, response);    
            }
            else {
                ((HttpServletResponse)response).setStatus(500);
                response.getOutputStream().write("Não autorizado ".getBytes()); 
            }
        }
    }
}