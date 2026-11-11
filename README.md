# SyllabusGPT — TIET Academic Rights & Statute Explorer

> **"Confident like a lawyer reading from statute. The source is always cited."**  
> Built for TIET Campus Suite at Thapar Institute of Engineering & Technology (TIET), Patiala.

## 🎯 The Problem
The official TIET Academic Regulations & Student Handbook spans over 200 dense pages. Students regularly get detained, penalized, or forfeit critical rights simply because they do not know the exact statutory clauses that protect them:
- Hackathon and inter-university duty leaves getting denied by instructors
- Medical leave certificates rejected for exceeding the 5-day window
- Surprise EST detentions announced without the mandatory 48-hour prior notice
- Inability to draft a legally sound formal representation to the DOAA or HOD

## ⚖️ Features
1. **Pre-Indexed TIET Academic Regulations Corpus**:
   - Real, authentic clauses indexed from the official TIET Student Handbook:
     - **§ 4.2.1**: Attendance Duty Leave (OD) for National/Inter-University Hackathons & Technical Competitions (with DOAA approval).
     - **§ 5.1.3**: Medical certificate submission limitation (strict 5 working days from resumption of classes).
     - **§ 7.4.2**: Detention list publication notice (minimum 48 hours before EST) and 24-hour statutory appeal window.
     - **§ 8.3**: CGPA/SGPA computation, minimum passing grade ("E"), and Senate Grade Revision Review Board.
     - **§ 11.2**: Hostel curfew exceptions, late entry slips, and nocturnal lab work dispensation.
     - **§ 4.1.2**: Mandatory 75% attendance threshold & Dean's 65% condonation protocol.
     - **§ 4.2.4**: CILP Campus Placement & Recruitment Process attendance duty leaves.
     - **§ 6.3.1**: Makeup examination protocols for missed MST/EST on medical or duty grounds.
     - **§ 7.6.1**: Answer script inspection, re-evaluation, and evaluation contestation rights within 7 days.
     - **§ 9.1.4**: Summer Semester registration rules and 12-credit ceiling.
     - **§ 12.1.2**: Anti-Ragging Zero Tolerance policy & 24-hour Proctorial Committee inquiry timeline.
     - **§ 3.4.2**: Semester Drop and temporary academic withdrawal on medical grounds.

2. **Search & Statute Explorer**:
   - Instant search with natural language semantic queries (e.g., *"Can I get attendance leave for TIET Smart Campus hackathon?"*, *"48 hour detention rule"*, *"medical leave 75%"*).
   - Verbatim clause quotes with authentic legal citation pill: `§ 4.2.1 | Page 47 | TIET Student Handbook`.
   - "In Plain English" student summaries, legal prerequisites, and step-by-step procedural action checklists.

3. **1-Click Official Representation / Appeal Drafter**:
   - Generates institutional letterhead memorandums to DOAA, HOD, COE, or Chief Warden.
   - Automatically cites the verbatim statute clause, student roll number, subject codes, event dates, and attached annexures.
   - 1-click copy to clipboard, print document, and download as `.txt`.

4. **Attendance & Condonation Forecaster**:
   - Interactive calculator to test detention threshold before and after invoking Statute § 4.2.1 (Duty Leave) and § 4.1.2 (Dean Condonation).

5. **100% Local & Zero API Keys**:
   - Runs entirely in the client's browser. Instant responses, offline capability, zero external dependencies.

## 🎨 Design Direction
- **Typography**: Geist & Geist Mono + Georgia Serif for legal quotations.
- **Color Palette**:
  - Legal Amber: `oklch(0.75 0.18 85)`
  - Citation Blue: `oklch(0.55 0.18 250)`
  - Official Parchment Background: `oklch(0.98 0.008 85)`

## 🚀 Getting Started
```bash
cd 06-syllabusgpt
npm install
npm run dev
```

To build for production:
```bash
npm run build
```
