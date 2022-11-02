package com.backend.footballapp.controllers;

import com.backend.footballapp.exceptions.AlreadyExistsException;
import com.backend.footballapp.exceptions.CannotDeleteAdminException;
import com.backend.footballapp.exceptions.CannotEditException;
import com.backend.footballapp.exceptions.ElementNotFoundException;
import com.backend.footballapp.models.dtos.ErrorDTO;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<?> handleException(AlreadyExistsException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(409)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }

    @ExceptionHandler(ElementNotFoundException.class)
    public ResponseEntity<?> handleException(ElementNotFoundException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(404)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }

    @ExceptionHandler(CannotDeleteAdminException.class)
    public ResponseEntity<?> handleException(CannotDeleteAdminException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(403)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }

    @ExceptionHandler(CannotEditException.class)
    public ResponseEntity<?> handleException(CannotEditException ex, HttpServletRequest req){
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(
                        ErrorDTO.builder()
                                .message(ex.getMessage())
                                .receivedAt( LocalDateTime.now() )
                                .status(403)
                                .method( HttpMethod.resolve(req.getMethod()) )
                                .path( req.getRequestURL().toString() )
                                .build()
                );
    }
}
