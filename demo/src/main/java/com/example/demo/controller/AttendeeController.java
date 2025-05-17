package com.example.demo.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Attendee;
import com.example.demo.repository.AttendeeRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/attendees")
@CrossOrigin(origins = "*") // Allow requests from any origin (for development)
public class AttendeeController {

    @Autowired
    private AttendeeRepository attendeeRepository;

    // Get all attendees
    @GetMapping
    public List<Attendee> getAllAttendees() {
        return attendeeRepository.findAll();
    }
    
    // Get attendee by ID
    @GetMapping("/{id}")
    public Attendee getAttendeeById(@PathVariable Long id) {
        Optional<Attendee> attendee = attendeeRepository.findById(id);
        return attendee.orElse(null);
    }
    
    // Create a new attendee
    @PostMapping
    public Attendee createAttendee(@RequestBody Attendee attendee) {
        return attendeeRepository.save(attendee);
    }
    
    // Update an attendee
    @PutMapping("/{id}")
    public Attendee updateAttendee(@PathVariable Long id, @RequestBody Attendee attendeeDetails) {
        Optional<Attendee> attendee = attendeeRepository.findById(id);
        if (attendee.isPresent()) {
            Attendee existingAttendee = attendee.get();
            existingAttendee.setFullName(attendeeDetails.getFullName());
            existingAttendee.setDateOfBirth(attendeeDetails.getDateOfBirth());
            existingAttendee.setUniversity(attendeeDetails.getUniversity());
            return attendeeRepository.save(existingAttendee);
        }
        return null;
    }
    
    // Delete an attendee
    @DeleteMapping("/{id}")
    public void deleteAttendee(@PathVariable Long id) {
        attendeeRepository.deleteById(id);
    }
}