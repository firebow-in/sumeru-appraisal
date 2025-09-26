package com.sumeru.repository;

import com.sumeru.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDepartment(String department);
    List<Employee> findByActiveTrue();

    boolean existsByEmail(String email);
    Optional<Employee> findByEmail(String email);
}