package com.sumeru.service;

import com.sumeru.entity.Appraisal;
import com.sumeru.repository.AppraisalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppraisalService {

    @Autowired
    private AppraisalRepository appraisalRepository;

    public List<Appraisal> getAppraisalsByEmployeeId(Long employeeId) {
        return appraisalRepository.findByEmployeeId(employeeId);
    }

    public Appraisal createAppraisal(Appraisal appraisal) {
        return appraisalRepository.save(appraisal);
    }

    public List<Appraisal> getAppraisalsByStatus(String status) {
        return appraisalRepository.findByStatus(status);
    }
}
