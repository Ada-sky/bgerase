package com.ada.removebg.controller;

import com.ada.removebg.dto.UserDTO;
import com.ada.removebg.response.RemoveBgResponse;
import com.ada.removebg.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createOrUpdateUser(@RequestBody UserDTO userDTO, Authentication authentication) {
        RemoveBgResponse response = null;

        try {
            // Bind frontend profile synchronisation to the identity established by the JWT filter.
            if (!authentication.getName().equals(userDTO.getClerkId())) {
                response = RemoveBgResponse.builder()
                        .success(false)
                        .data("User does ont have permission to access the resource")
                        .statusCode(HttpStatus.FORBIDDEN)
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
            }

            UserDTO user = userService.saveUser(userDTO);
            response = RemoveBgResponse.builder()
                    .success(true)
                    .data(user)
                    .statusCode(HttpStatus.OK)
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception exception) {
            response = RemoveBgResponse.builder()
                    .success(false)
                    .data(exception.getMessage())
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }

    @GetMapping("/credits")
    public ResponseEntity<?> getUserCredits(Authentication authentication) {
        RemoveBgResponse bgResponse = null;
        try {
            if (authentication.getName().isEmpty() || authentication.getName() == null) {
                bgResponse = RemoveBgResponse.builder()
                        .statusCode(HttpStatus.FORBIDDEN)
                        .data("User does not have permission/access to this resource")
                        .success(false)
                        .build();
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(bgResponse);
            }

            String clerkId = authentication.getName();
            UserDTO existingUser = userService.getUserByClerkId(clerkId);
            Map<String, Integer> map = new HashMap<>();
            map.put("credits", existingUser.getCredits());
            bgResponse = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.OK)
                    .data(map)
                    .success(true)
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(bgResponse);

        } catch (Exception e) {
            bgResponse = RemoveBgResponse.builder()
                    .statusCode(HttpStatus.INTERNAL_SERVER_ERROR)
                    .data("Something went wrong")
                    .success(false)
                    .build();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(bgResponse);
        }
    }
}
