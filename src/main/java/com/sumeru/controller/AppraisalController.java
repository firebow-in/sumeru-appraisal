package com.sumeru.controller;

import com.sumeru.entity.Appraisal;
import com.sumeru.service.AppraisalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class AppraisalController {

    @Autowired
    private AppraisalService appraisalService;

    @GetMapping("/{employeeId}/appraisals")
    public List<Appraisal> getEmployeeAppraisals(@PathVariable Long employeeId) {
        return appraisalService.getAppraisalsByEmployeeId(employeeId);
    }

    @PostMapping("/{employeeId}/appraisals")
    public Appraisal createAppraisal(@PathVariable Long employeeId, @RequestBody Appraisal appraisal) {
        appraisal.setEmployeeId(employeeId);
        if (appraisal.getAppraisalDate() == null) {
            appraisal.setAppraisalDate(LocalDate.now());
        }
        return appraisalService.createAppraisal(appraisal);
    }

    @GetMapping("/appraisals/status/{status}")
    public List<Appraisal> getAppraisalsByStatus(@PathVariable String status) {
        return appraisalService.getAppraisalsByStatus(status);
    }
}
