package com.ada.removebg.service;

import com.ada.removebg.dto.UserDTO;

public interface UserService {
    UserDTO saveUser(UserDTO userDTO);

    UserDTO getUserByClerkId(String clerkId);

    void deleteUserByClerkId(String clerkId);
}
