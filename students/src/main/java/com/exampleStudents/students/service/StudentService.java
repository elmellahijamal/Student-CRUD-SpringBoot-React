package com.exampleStudents.students.service;

import com.exampleStudents.students.entity.Student;
import com.exampleStudents.students.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public Student postStudent(Student student){
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }
    public void deleteStudent(Long id){
        if (!studentRepository.existsById(id)){
            throw new EntityNotFoundException("Student with the ID : " + id + " not found");
        }
        studentRepository.deleteById(id);
    }

    public Student getStudentByID(Long id){
        return studentRepository.findById(id).orElse(null);
    }


    public Student editStudent(Long id, Student student){
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()){
            Student existingStudent = optionalStudent.get();

            existingStudent.setEmail(student.getEmail());
            existingStudent.setName(student.getName());
            existingStudent.setPhone(student.getPhone());
            existingStudent.set_class(student.get_class());

            return studentRepository.save(existingStudent);
        }
        return null;
    }

}
