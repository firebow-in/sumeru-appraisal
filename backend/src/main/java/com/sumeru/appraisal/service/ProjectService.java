package com.sumeru.appraisal.service;

import com.sumeru.appraisal.entity.Project;
import com.sumeru.appraisal.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getProjectsByEmployeeId(Long employeeId) {
        return projectRepository.findByEmployeeId(employeeId);
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public List<Project> getProjectsByStatus(String status) {
        return projectRepository.findByStatus(status);
    }
}
