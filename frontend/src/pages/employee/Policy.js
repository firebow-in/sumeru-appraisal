import React from 'react';
import './Policy.css';

const Policy = () => {
  return (
    <div className="policy-page">
      <div className="policy-card">
        <div className="policy-header-row">
          <h1 className="policy-title">Leave, Attendance & Working Hours Policy</h1>
          <a href="/Policy.Pdf" download className="download-btn" title="Download Policy PDF">Download PDF</a>
        </div>

        <section className="policy-section" aria-labelledby="objective">
          <h2 id="objective">1. Objective</h2>
          <p>
            This policy defines the framework for managing employee leave, attendance, and working hours
            to ensure fairness, accountability, and smooth business operation.
          </p>
        </section>

        <section className="policy-section" aria-labelledby="types">
          <h2 id="types">2. Types of Leave</h2>

          <article className="policy-subsection" aria-labelledby="cl">
            <h3 id="cl">2.1 Casual Leave (CL)</h3>
            <ul>
              <li>Credited in full at the beginning of the calendar year (or pro-rated at joining).</li>
              <li>Approval is mandatory before availing CL.</li>
              <li>
                Notice period based on leave duration:
                <ul>
                  <li>1 CL → Apply at least 3 working days in advance.</li>
                  <li>2 CLs → Apply at least 6 working days in advance.</li>
                  <li>3+ CLs → Apply at least 2 weeks in advance.</li>
                </ul>
              </li>
              <li>Carry Forward: Maximum of 5 CLs can be carried forward to the next year.</li>
            </ul>
          </article>

          <article className="policy-subsection" aria-labelledby="sl">
            <h3 id="sl">2.2 Sick Leave (SL)</h3>
            <ul>
              <li>Credited in full at the beginning of the calendar year.</li>
              <li>May be taken without prior notice in case of emergencies.</li>
              <li>If availed for more than 2 consecutive days, a doctor’s prescription is mandatory.</li>
              <li>CL and SL cannot be combined in one application.</li>
              <li>Carry Forward: Maximum of 3 SLs can be carried forward to the next year.</li>
            </ul>
          </article>

          <article className="policy-subsection" aria-labelledby="long-leave">
            <h3 id="long-leave">2.3 Long Leave (1+ Week)</h3>
            <ul>
              <li>Employees applying for more than 1 week leave must:</li>
              <ul>
                <li>Nominate a backup resource for responsibilities.</li>
                <li>Ensure the backup is not on planned leave during the same time.</li>
              </ul>
              <li>Leave will only be approved after handover confirmation and manager approval.</li>
            </ul>
          </article>

          <article className="policy-subsection" aria-labelledby="comp-off">
            <h3 id="comp-off">2.4 Compensatory Off (Comp-Off)</h3>
            <p>Employees are eligible if they have worked on a company-declared holiday/weekly off.</p>
            <h4>Rules:</h4>
            <ul>
              <li>Must be approved in advance by the manager.</li>
              <li>Must be availed within 45–60 days of being earned.</li>
            </ul>
          </article>

          <article className="policy-subsection" aria-labelledby="earned-leave">
            <h3 id="earned-leave">2.5 Earned Leave (EL)</h3>
            <ul>
              <li>Employees earn 1 EL for every 26 consecutive working days without leave.</li>
              <li>ELs can be carried forward as per company rules.</li>
            </ul>
          </article>
        </section>

        <section className="policy-section" aria-labelledby="sandwich">
          <h2 id="sandwich">3. Sandwich Leave Rule</h2>
          <p>
            If a holiday/weekend falls between two unapproved leaves, the intervening days will also be counted as leave.
          </p>
          <h4>Examples:</h4>
          <ul>
            <li>Leave on Friday + Monday (unapproved) → Saturday & Sunday also counted as LOP.</li>
            <li>Holiday on Friday, leave on Thursday + Monday (unapproved) → Friday holiday also counted as LOP.</li>
          </ul>
          <p><strong>Exception:</strong> Sandwich leave will not apply if leave is pre-approved.</p>
        </section>

        <section className="policy-section" aria-labelledby="approval">
          <h2 id="approval">4. Approval Flow</h2>
          <ul>
            <li>Casual Leave → Employee applies → Manager approves → HR records.</li>
            <li>Sick Leave → Employee applies → HR validates (doctor’s note if &gt;2 days). If no document, verify by HR/Manager.</li>
            <li>Long Leave → Employee applies + nominates backup → Manager approves → HR records.</li>
            <li>Comp-Off → Employee applies (with justification) → Manager approves → HR records.</li>
          </ul>
        </section>

        <section className="policy-section" aria-labelledby="general">
          <h2 id="general">5. General Rules</h2>
          <ol>
            <li>Leave balances are valid for the calendar year (1 Jan 2025 – 31 Dec 2025); carry-forward limits apply.</li>
            <li>Unauthorized / Not approved Leave → Loss of Pay (LOP) + possible disciplinary action.</li>
            <li>Emergency exceptions may be approved at HR/Management discretion. Changes should be displayed on Employee/HR/Manager board.</li>
            <li>Employees must regularly check their leave balance on the HR portal if they want.</li>
          </ol>
        </section>

        <section className="policy-section" aria-labelledby="attendance">
          <h2 id="attendance">Attendance & System Rules (Platform Automation)</h2>

          <article className="policy-subsection" aria-labelledby="late">
            <h3 id="late">1. Late Coming Rules</h3>
            <ul>
              <li>If an employee arrives after 10:30 AM on 3 consecutive days → System marks FULL Day.</li>
              <li>Admin/Manager can override (approve/reject) → Employee receives notification with reason.</li>
              <li>If an employee arrives after 11:00 AM → System marks Half Day.</li>
              <li>Admin/Manager can override → Employee receives notification with reason.</li>
            </ul>
          </article>

          <article className="policy-subsection" aria-labelledby="hours">
            <h3 id="hours">2. Working Hours Rules</h3>
            <ul>
              <li>If an employee does not complete required working hours → System sends alert/notification mail (CC: HR + Manager).</li>
              <li>If the employee repeatedly comes late and leaves early → After 3 alerts, 1 leave is deducted automatically.</li>
            </ul>
          </article>

          <article className="policy-subsection" aria-labelledby="check">
            <h3 id="check">3. Check-In/Check-Out Rules</h3>
            <ul>
              <li>If there is no check-in/check-out entry → System sends auto-notification to employee.</li>
              <li>HR to upload daily check-in/check-out excel → System sends auto-notification to CEO if data is missing for previous day.</li>
            </ul>
          </article>

          <article className="policy-subsection" aria-labelledby="comm">
            <h3 id="comm">4. Leave Communication Rules</h3>
            <ul>
              <li>Employees on leave must inform their team/colleagues via email.</li>
              <li>
                System will display a “Who’s on Leave Today” dashboard accessible by: Admin / HR / Managers / CEO / Employees.
              </li>
            </ul>
          </article>
        </section>
      </div>
    </div>
  );
};

export default Policy;


