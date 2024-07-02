package com.exampleStudents.students.controller;

import com.exampleStudents.students.entity.Student;
import com.exampleStudents.students.service.StudentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class StudentController {


    private final StudentService studentService;

    @PostMapping("/student")
    public Student postStudent(@RequestBody Student student){
        return studentService.postStudent(student);
    }

    @GetMapping("/students")
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @DeleteMapping("/student/{id}")
    public ResponseEntity<?> deleteStudent(@PathVariable Long id){
        try{
            studentService.deleteStudent(id);
            return new ResponseEntity<>("Student with ID : " + id + " deleted successfully", HttpStatus.OK);
        }catch (EntityNotFoundException e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable Long id){
        Student student = studentService.getStudentByID(id);
        if (student == null){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(student);
    }

    @PatchMapping("/student/{id}")
    public ResponseEntity<?> editStudent(@PathVariable Long id,@RequestBody Student student){
        Student editedStudent = studentService.editStudent(id,student);

        if (editedStudent == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(editedStudent);
    }

}
