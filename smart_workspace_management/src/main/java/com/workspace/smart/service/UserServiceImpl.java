package com.workspace.smart.service;

import com.workspace.smart.model.User;
import com.workspace.smart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user){
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }

    @Override
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Long id, User userDetails) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword());
            user.setRole(userDetails.getRole());
            return userRepository.save(user);
        }
        return null;
    }

    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }

}
//
//package com.workspace.smart.service;
//
//import com.workspace.smart.model.User;
//import com.workspace.smart.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class UserServiceImpl implements UserService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Override
//    public User createUser(User user) {
//        return userRepository.save(user);
//    }
//
//    @Override
//    public User getUserById(Long id) {
//        return userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
//    }
//
//    @Override
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }
//
//    @Override
//    public User updateUser(Long id, User userDetails) {
//        User user = userRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
//
//        user.setName(userDetails.getName());
//        user.setEmail(userDetails.getEmail());
//        user.setPassword(userDetails.getPassword());
//        user.setRole(userDetails.getRole());
//
//        return userRepository.save(user);
//    }
//
//    @Override
//    public void deleteUser(Long id) {
//        if (!userRepository.existsById(id)) {
//            throw new RuntimeException("User not found with ID: " + id);
//        }
//        userRepository.deleteById(id);
//    }
//}
