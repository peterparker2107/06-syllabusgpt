export interface RegulationStatute {
  id: string;
  section: string;
  title: string;
  category: 'Attendance & Leaves' | 'Medical & Emergency' | 'Detention & Appeals' | 'Examinations & Grading' | 'Hostel & Campus Life' | 'Placements & Internships';
  pageNumber: number;
  documentName: string;
  verbatimClause: string;
  studentSummary: string;
  keyConditions: string[];
  actionSteps: string[];
  tags: string[];
  sampleQueries: string[];
  statuteLevel: 'Statutory Right' | 'Conditional Discretion' | 'Mandatory Procedure' | 'Appeals Protocol';
  authority: 'Dean of Academic Affairs (DOAA)' | 'Head of Department (HOD)' | 'Chief Warden' | 'Dean of Student Affairs (DOSA)' | 'Controller of Examinations (COE)';
  appealTemplate: {
    targetAuthority: string;
    subjectLine: string;
    bodySummary: string;
    statuteReference: string;
  };
}

export const TIET_REGULATIONS: RegulationStatute[] = [
  {
    id: 'tiet-reg-4-2-1',
    section: '§ 4.2.1',
    title: 'Duty Leave & Attendance Exemption for Technical Competitions & Academic Events',
    category: 'Attendance & Leaves',
    pageNumber: 47,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'Students representing Thapar Institute of Engineering & Technology (TIET) in authorized National or Inter-University Technical Competitions, Hackathons, Coding Contests, or Academic Symposiums approved by the Competent Authority shall be granted Attendance Duty Leave (OD). The lectures missed during the sanctioned duration (inclusive of documented transit time) shall be treated as "Present on Institutional Duty" and factored into calculating the mandatory aggregate attendance percentage.',
    studentSummary:
      'You are officially entitled to attendance duty leave for participating in authorized competitions and academic symposiums (such as Smart India Hackathon, ACM ICPC, inter-university technical meets, etc.). If you obtain prior or post approval with proof of participation/selection, teachers cannot mark you absent or deduct your attendance score for those days.',
    keyConditions: [
      'Prior intimation or recommendation endorsed by the Faculty Mentor / Department Coordinator.',
      'Formal sanction accorded by the Office of the Dean of Academic Affairs (DOAA).',
      'Submission of official certificate of participation / event credential within 7 working days of returning to campus.',
      'Duty leave covers active event days plus official railway/transit itinerary.'
    ],
    actionSteps: [
      'Fill the DOAA Duty Leave Representation Form attaching event invitation / team shortlist.',
      'Obtain signature from your Faculty Advisor or Society President.',
      'Submit to Academic Section (Admin Block Room 104) before departure or within 72 hours of return.',
      'Provide copy of stamped duty waiver to individual subject instructors.'
    ],
    tags: ['duty leave', 'duty leave waiver', 'technical competition', 'attendance exemption', 'od', 'doaa', 'inter-university', 'symposium'],
    sampleQueries: [
      'Can I get attendance leave for inter-university technical competitions?',
      'How to apply for competition duty leave at Thapar?',
      'Will I get attendance compensation for competing outside campus?',
      'What is the rule for technical competition attendance waiver?'
    ],
    statuteLevel: 'Statutory Right',
    authority: 'Dean of Academic Affairs (DOAA)',
    appealTemplate: {
      targetAuthority: 'The Dean of Academic Affairs (DOAA)\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Representation for Sanction of Attendance Duty Leave under Statute § 4.2.1 for Technical Competition',
      bodySummary: 'Respectfully submitting this representation under Section 4.2.1 of the Academic Regulations for grant of Attendance Duty Leave (OD) on account of representing the Institute at the designated technical contest/hackathon.',
      statuteReference: 'Section 4.2.1, Page 47, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-5-1-3',
    section: '§ 5.1.3',
    title: 'Medical Certificate Submission Window & Attendance Compensation',
    category: 'Medical & Emergency',
    pageNumber: 58,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'In the event of absence occasioned by certified illness or medical hospitalization, the student must submit an authentic Medical Fitness Certificate issued or endorsed by the TIET Campus Health Centre / Recognized Government Hospital within exactly five (5) working days from the date of resumption of regular classes. Certificates submitted beyond this statutory five-day limitation shall be deemed time-barred and summarily rejected, with no retrospective attendance condonation permissible.',
    studentSummary:
      'If you fell sick or were hospitalized, you have an ironclad 5-day deadline after returning to classes to submit your medical slip to the Health Centre and Academic Section. If you miss this 5-day window, the institute rules strictly bar your attendance waiver, regardless of how genuine your illness was.',
    keyConditions: [
      'Strict 5 working days deadline starting from your first day back on campus.',
      'Must be counter-verified / endorsed by the TIET Campus Medical Officer (Health Centre near Hostel G).',
      'Hospital discharge summary, OPD prescription slips, and diagnostic test bills must be attached.',
      'Applicable up to the statutory 10% medical condonation band (allowing condonation from 75% down to 65%).'
    ],
    actionSteps: [
      'Visit the TIET Health Centre with all original medical papers and prescriptions within 5 days of resuming classes.',
      'Obtain the Campus Medical Officer counter-stamp and registration voucher.',
      'Submit the endorsed dossier along with an application letter to the DOAA Academic Counter.',
      'Keep a stamped photocopy of the submission as legal proof of timely filing.'
    ],
    tags: ['medical leave', 'medical certificate', 'health centre', 'hospital', '5 days rule', 'illness', 'attendance compensation', 'sick leave', 'condonation'],
    sampleQueries: [
      'What is the medical leave rule at Thapar?',
      'How many days do I have to submit my medical certificate?',
      'Can I get attendance for hospital admission?',
      'What happens if I submit my medical certificate late?'
    ],
    statuteLevel: 'Mandatory Procedure',
    authority: 'Dean of Academic Affairs (DOAA)',
    appealTemplate: {
      targetAuthority: 'The Dean of Academic Affairs (DOAA)\nThrough: Campus Medical Officer (Health Centre)\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Submission of Medical Verification & Request for Attendance Consideration under Statute § 5.1.3',
      bodySummary: 'Humbly placing on record the attached certified medical documents within the prescribed 5 working day statutory window as per Section 5.1.3 of the TIET Academic Regulations, praying for attendance regularization.',
      statuteReference: 'Section 5.1.3, Page 58, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-7-4-2',
    section: '§ 7.4.2',
    title: 'Detention List Publication Notice & 48-Hour Statutory Appeal Deadline',
    category: 'Detention & Appeals',
    pageNumber: 82,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'The preliminary list of students detained from appearing in the End Semester Examination (EST) on account of attendance shortfall (<75%) shall be officially published on Webkiosk and departmental notice boards not less than forty-eight (48) hours prior to the scheduled commencement of the respective subject examination. A aggrieved candidate maintains the fundamental statutory right to file a formal representation against wrongful detention before the Departmental Academic Appeals Committee within twenty-four (24) hours of publication.',
    studentSummary:
      'The department cannot spring a surprise detention on you at the exam hall door! The rules legally compel them to publish the detention list at least 48 hours before the exam begins. Once published, you have a 24-hour statutory window to submit an urgent appeal to prove errors in attendance tally or uncounted duty leaves.',
    keyConditions: [
      'Detention list must be publicized at least 48 hours prior to EST start time.',
      'Student retains 24 hours from timestamp of publication to lodge written contestation.',
      'Appeals must cite discrepancies in lecture logs, duty leave sanction slips, or medical certificates.',
      'HOD must issue a speaking order / resolution prior to 3 hours before exam schedule.'
    ],
    actionSteps: [
      'Download your Webkiosk lecture-by-lecture attendance audit log immediately.',
      'Identify lectures where duty leave, medical leave, or biometric mismatch was uncredited.',
      'Draft an Emergency Representation to the HOD invoking Statute § 7.4.2.',
      'Deliver copy to HOD Office and the Course Instructor with stamped receiving.'
    ],
    tags: ['detention', 'detained', 'est detention', '48 hours rule', 'appeal deadline', 'webkiosk', 'attendance shortfall', 'appeals committee'],
    sampleQueries: [
      'Can I be detained without prior notice before EST?',
      'How to contest a detention list notice at TIET?',
      'What is the 48 hour detention rule at Thapar?',
      'I was wrongly detained in EST, what should I do?'
    ],
    statuteLevel: 'Appeals Protocol',
    authority: 'Head of Department (HOD)',
    appealTemplate: {
      targetAuthority: 'The Head of Department & Chairman, Departmental Academic Appeals Committee\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Urgent Representation Against Erroneous EST Detention under Statute § 7.4.2 (24-Hour Appeal Window)',
      bodySummary: 'Submitting an immediate statutory appeal against inclusion in the provisional EST detention roster for the referenced course, presenting certified lecture records and uncredited duty leave waivers.',
      statuteReference: 'Section 7.4.2, Page 82, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-8-3',
    section: '§ 8.3',
    title: 'CGPA & SGPA Computation, Passing Criteria, and Grade Revision Review Board',
    category: 'Examinations & Grading',
    pageNumber: 94,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'Semester Grade Point Average (SGPA) and Cumulative Grade Point Average (CGPA) shall be computed on a standard 10-point scale on credit-weighted evaluation. The minimum passing grade in any theory or practical course is "E" (Grade Point 4). If an anomaly or computational discrepancy in award of grades is detected post-publication, the Academic Senate Review Board holds singular jurisdiction to rectify transcripts upon recommendation by the Departmental Committee.',
    studentSummary:
      'Grading is 10-point scale. Passing grade is "E" (4 points); below that is "F" or "I". If you suspect an administrative or calculation error in your final SGPA/CGPA or letter grade, you have a formal right to trigger a Grade Revision Review through the department within the specified post-result revision window.',
    keyConditions: [
      'Minimum passing grade in every credit unit is "E" (4.0/10.0).',
      'SGPA = Sum(Credits * Grade Points) / Total Semester Credits.',
      'Grade contestation requires specific clerical or grading rubric discrepancy; subjective appeals without evidence are dismissed.',
      'Senate Approval is mandatory for formal transcript modifications.'
    ],
    actionSteps: [
      'Request breakdown of continuous evaluation (MST, Sessional, Quizzes, EST) from the course coordinator.',
      'Check if normalized marks match the cutoffs announced in the pre-grading display.',
      'File application for scrutiny / grade audit to the Controller of Examinations via HOD.',
      'Deposit the prescribed nominal scrutiny fee at the accounts window.'
    ],
    tags: ['cgpa', 'sgpa', 'grading scale', 'passing grade', 'grade revision', 'senate', 'gpa calculation', 'grade point', 'transcript'],
    sampleQueries: [
      'What is the passing grade at Thapar?',
      'How is CGPA calculated at TIET?',
      'Can I contest an erroneous grade on my transcript?',
      'What is the minimum SGPA required to clear the semester?'
    ],
    statuteLevel: 'Statutory Right',
    authority: 'Controller of Examinations (COE)',
    appealTemplate: {
      targetAuthority: 'The Controller of Examinations (COE)\nThrough: Head of Department\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Application for Scrutiny and Grade Rectification under Statute § 8.3',
      bodySummary: 'Requesting formal scrutiny and re-computation of continuous evaluation and EST scores for the indicated subject code due to an apparent clerical anomaly in the published grade sheet.',
      statuteReference: 'Section 8.3, Page 94, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-11-2',
    section: '§ 11.2',
    title: 'Hostel Curfew Regulations, Night Out Protocols & Late Entry Dispensation',
    category: 'Hostel & Campus Life',
    pageNumber: 126,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'All resident hostel inmates are subject to the standard campus entry curfew (20:30 hrs for standard curfew or designated seasonal hours). Inmates requiring dispensation for academic lab work, hackathons, approved library nocturnal study sessions, or travel departures must generate an authorized Digital Out-Pass or procure an explicit Late Entry Slip endorsed by the Warden / Caretaker or Faculty In-Charge. Unwarranted late arrivals exceeding three infractions per semester shall be reported to the Chief Warden.',
    studentSummary:
      'Curfew is standard 8:30 PM (or seasonal/gender specified guidelines). However, students working on hackathons, institute robotics labs, library research, or travelling home have an official right to late entry dispensation slips or night-out approvals with prior digital pass generation or faculty lab authorization.',
    keyConditions: [
      'Digital out-pass via TIET student portal / hostel management system before curfew.',
      'Nocturnal lab work dispensation requires email authorization from Project Guide / Lab Faculty.',
      'Maximum 3 unexcused late infractions per semester before formal proctorial notification to parents.',
      'Emergency medical transit or railway arrivals are exempted upon presentation of ticket / hospital slip.'
    ],
    actionSteps: [
      'Log into the Hostel Portal or register with hostel caretaker before 7:00 PM for planned late entry.',
      'For hackathons or lab work, present faculty mentor recommendation letter to the Hostel Warden.',
      'Upon late arrival, show student ID and digital transit approval to hostel security gates.',
      'Retain caretaker receipt slip for any curfew waiver.'
    ],
    tags: ['hostel curfew', 'night out', 'late entry slip', 'warden', 'hostel outpass', 'campus timing', 'chief warden', 'hostel fine'],
    sampleQueries: [
      'What is the hostel curfew rule at Thapar?',
      'How to get late entry permission for hackathon night work?',
      'What happens if I enter hostel after curfew?',
      'How many late slips are allowed per semester?'
    ],
    statuteLevel: 'Conditional Discretion',
    authority: 'Chief Warden',
    appealTemplate: {
      targetAuthority: 'The Warden / Chief Warden\nHostel Residence Council\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Request for Curfew Dispensation / Academic Night-Out Permission under Statute § 11.2',
      bodySummary: 'Respectfully requesting nocturnal campus/lab dispensation under Section 11.2 of the Student Handbook for academic project work / technical competition representation during the specified hours.',
      statuteReference: 'Section 11.2, Page 126, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-4-1-2',
    section: '§ 4.1.2',
    title: 'Mandatory 75% Minimum Attendance & 65% Dean Condonation Protocol',
    category: 'Attendance & Leaves',
    pageNumber: 45,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'Every student is legally obligated to maintain an aggregate class attendance of not less than 75% in each registered course (Lectures, Tutorials, and Practicals separately). The Dean of Academic Affairs (DOAA) retains discretionary authority to condone attendance shortfall up to a maximum of 10% (i.e. permitting attendance down to 65%) exclusively on grounds of certified prolonged medical hospitalization, bereavement in immediate family, or state/national level representation.',
    studentSummary:
      'Default requirement is 75% attendance in lectures, labs, and tutorials. If your attendance falls between 65% and 74.9%, you can be saved from detention only if the DOAA condones your deficit based on approved medical slips, bereavement, or authorized institutional duty leaves.',
    keyConditions: [
      'Absolute minimum floor under any condonation is 65.0%; no authority can condone below 65%.',
      'Condonation between 65% and 75% requires documentary proof (hospital bills, duty certificates).',
      'Lectures, Tutorials, and Labs are evaluated independently; detention in one component bars EST appearance in that course.',
      'Application for condonation must be submitted before the pre-EST deadline.'
    ],
    actionSteps: [
      'Calculate current attendance: (Attended / Held) * 100.',
      'If between 65% and 74.9%, compile all duty leave certificates and medical slips.',
      'Submit formal condonation prayer to DOAA through HOD before the detention list is drawn.',
      'Verify that the academic portal updates your effective attendance.'
    ],
    tags: ['75 attendance', '65 condonation', 'minimum attendance', 'doaa condonation', 'detention threshold', 'shortfall', 'lecture cut'],
    sampleQueries: [
      'What is the minimum attendance required at Thapar?',
      'Can 65% attendance be condoned at TIET?',
      'Will I get detained if my attendance is 70%?',
      'How does DOAA attendance condonation work?'
    ],
    statuteLevel: 'Conditional Discretion',
    authority: 'Dean of Academic Affairs (DOAA)',
    appealTemplate: {
      targetAuthority: 'The Dean of Academic Affairs (DOAA)\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Prayer for Condonation of Attendance Shortfall under Statute § 4.1.2',
      bodySummary: 'Praying for exercise of statutory discretion under Section 4.1.2 to condone attendance shortfall between 65% and 75% supported by documentary evidence of certified medical / extracurricular grounds.',
      statuteReference: 'Section 4.1.2, Page 45, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-4-2-4',
    section: '§ 4.2.4',
    title: 'Campus Placement & Recruitment Process Attendance Duty Leave',
    category: 'Placements & Internships',
    pageNumber: 51,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'Final year and pre-final year students participating in scheduled on-campus / virtual placement drives, pre-placement talks (PPT), online assessments, and technical/HR interviews coordinated by the Centre for Industrial Liaison & Placement (CILP) are entitled to placement duty leave. The CILP office shall furnish certified attendance sheets directly to the Academic Section for automatic system credit.',
    studentSummary:
      'When you are attending CILP placement tests, interviews, or company pre-placement talks, you are legally entitled to duty leave. CILP transmits attendance rosters directly to the DOAA office, but you should retain your shortlisting email to ensure teachers credit your missed classes.',
    keyConditions: [
      'Drives must be formally registered and coordinated by CILP.',
      'Student must appear on the CILP attendance roster signed by company invigilators.',
      'Exemption applies strictly during the scheduled hours of the test/interview.',
      'In case of system mismatch, student has 5 days to file a CILP endorsement slip.'
    ],
    actionSteps: [
      'Sign the CILP physical or digital attendance register during the drive.',
      'Check Webkiosk attendance 4 days after the drive to verify duty leave reflection.',
      'If absent mark persists, request an attendance verification slip from CILP coordinator (Admin 2nd Floor).',
      'Submit slip to respective subject teachers.'
    ],
    tags: ['placement duty leave', 'cilp', 'job interview', 'online test', 'ppt', 'internship drive', 'placement attendance'],
    sampleQueries: [
      'Do I get attendance for attending placement interviews?',
      'How does CILP duty leave get credited?',
      'What if my teacher marked me absent during a placement drive?',
      'Placement attendance leave rules TIET'
    ],
    statuteLevel: 'Statutory Right',
    authority: 'Dean of Academic Affairs (DOAA)',
    appealTemplate: {
      targetAuthority: 'The Centre for Industrial Liaison & Placement (CILP) / DOAA\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Request for Regularization of Placement Duty Leave under Statute § 4.2.4',
      bodySummary: 'Submitting formal request for credit of placement duty leave pursuant to Section 4.2.4 for participation in the scheduled recruitment round of the visiting organization.',
      statuteReference: 'Section 4.2.4, Page 51, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-6-3-1',
    section: '§ 6.3.1',
    title: 'Makeup Examination Regulations for Missed MST/EST on Genuine Grounds',
    category: 'Examinations & Grading',
    pageNumber: 71,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'A student who fails to appear in the Mid-Semester Test (MST) or End-Semester Test (EST) due to certified severe illness requiring inpatient hospitalization, death of an immediate family member, or authorized participation in institute-level competitive events may apply for a formal Make-up Examination. The application must be filed within three (3) working days of the missed examination, subject to scrutiny and sanction by the Academic Appeals Committee.',
    studentSummary:
      'If you missed an MST or EST because you were in the hospital, faced a family bereavement, or represented TIET officially, you can sit for an official Makeup Exam. You must apply within 3 working days of the missed exam with hospital proofs or sanction letters.',
    keyConditions: [
      'Application strictly within 3 working days of the exam date.',
      'Hospital indoor patient IPD papers or official TIET deputation letter mandatory.',
      'Makeup MST is evaluated with the same rigour; marks substitute the missed session.',
      'Nominal fee applicable if prescribed by the COE office unless exempted for institute duty.'
    ],
    actionSteps: [
      'Download and complete the TIET Make-up Examination Form.',
      'Attach emergency medical proofs endorsed by Campus Doctor or duty leave sanctions.',
      'Submit to HOD office for committee evaluation.',
      'Check date sheet for the makeup test slot issued by COE.'
    ],
    tags: ['makeup exam', 'missed mst', 'missed est', 'makeup test', 'exam leave', 'hospitalization exam', 're-exam'],
    sampleQueries: [
      'Can I give makeup exam if I missed MST due to illness?',
      'What is the rule for missed EST at Thapar?',
      'How to apply for make-up examination at TIET?',
      'How many days to apply for makeup test after missing exam?'
    ],
    statuteLevel: 'Statutory Right',
    authority: 'Controller of Examinations (COE)',
    appealTemplate: {
      targetAuthority: 'The Chairman, Academic Appeals Committee / DOAA\nThrough: Head of Department\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Application for Sanction of Make-up Examination under Statute § 6.3.1',
      bodySummary: 'Applying for permission to appear in the Make-up Examination for the missed continuous evaluation/EST under Section 6.3.1 due to bona fide extenuating circumstances as supported by the attached documents.',
      statuteReference: 'Section 6.3.1, Page 71, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-7-6-1',
    section: '§ 7.6.1',
    title: 'Answer Script Inspection, Scrutiny & Evaluation Contestation Rights',
    category: 'Examinations & Grading',
    pageNumber: 87,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'Every examinee has the fundamental academic entitlement to inspect their evaluated Mid-Semester Test (MST) and End-Semester Test (EST) answer scripts. Instructors are mandated to display marked answer sheets within five working days of examination conclusion. If a student detects un-evaluated answers, totaling inaccuracies, or manifest grading bias, an application for Re-checking / Re-evaluation may be filed within seven (7) days of official grade publication.',
    studentSummary:
      'You have an unquestionable right to see your checked answer sheets! Teachers cannot withhold your evaluated papers. If you find an unmarked answer, calculation mistake, or incorrect totaling, you have 7 days post-grade publication to formally demand re-checking.',
    keyConditions: [
      'Mandatory display of marked MST/EST answer scripts by course instructors.',
      'Re-checking covers unchecked questions and arithmetic calculation mistakes.',
      'Re-evaluation by independent evaluator can be sought upon depositing the designated university scrutiny fee.',
      'Grade can be revised upward or downward based on neutral re-evaluation.'
    ],
    actionSteps: [
      'Attend the designated answer sheet showing session organized by the course instructor.',
      'Point out totaling mistakes or un-evaluated questions directly to the professor.',
      'If unresolved, file an official Scrutiny Application at the COE Office within 7 days of result notification.',
      'Track the revision order issued to the Academic Section.'
    ],
    tags: ['answer script', 're-evaluation', 'paper checking', 'totaling mistake', 'scrutiny', 'contest marks', 'est marks'],
    sampleQueries: [
      'Can I see my checked EST answer sheet at Thapar?',
      'How do I contest marks if my teacher evaluated incorrectly?',
      'What is the re-evaluation procedure at TIET?',
      'Can I ask for re-totaling of my exam marks?'
    ],
    statuteLevel: 'Statutory Right',
    authority: 'Controller of Examinations (COE)',
    appealTemplate: {
      targetAuthority: 'The Controller of Examinations (COE)\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Formal Petition for Answer Script Scrutiny & Re-checking under Statute § 7.6.1',
      bodySummary: 'Submitting petition for formal scrutiny and re-checking of the answer script for the referenced subject code under Section 7.6.1 of the Academic Regulations, identifying specific un-evaluated answers / totaling discrepancies.',
      statuteReference: 'Section 7.6.1, Page 87, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-9-1-4',
    section: '§ 9.1.4',
    title: 'Summer Semester Registration, Credit Caps & Backlog Remediation',
    category: 'Examinations & Grading',
    pageNumber: 108,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'Students with backlog ("F" or "E" grade) or those aiming to improve academic standing are eligible to register for the intensive 6-8 week Summer Term. The maximum permissible academic load during a Summer Term is strictly capped at twelve (12) credits or three theoretical courses (whichever is lower). Course offerings are subject to minimum enrollment thresholds determined by the Academic Senate.',
    studentSummary:
      'During the summer semester, you can register for up to 12 credits (or max 3 theory subjects) to clear backlogs or improve grades. Attendance rules (75%) apply strictly in summer term as well due to the compressed timetable.',
    keyConditions: [
      'Maximum credit limit in Summer Term is 12 credits.',
      'Open to students clearing previous backlogs or improving low grades.',
      'Attendance requirement of 75% remains mandatory over the compressed term.',
      'Only courses with sufficient student registration are officially floated.'
    ],
    actionSteps: [
      'Check the DOAA Summer Term course offering notification published in May.',
      'Select courses within the 12-credit ceiling on Webkiosk.',
      'Pay the per-credit summer registration fee at the bank/online counter.',
      'Attend compressed lectures and maintain 75% attendance.'
    ],
    tags: ['summer semester', 'summer term', 'backlog', '12 credits', 'grade improvement', 'clearing backlog', 'summer credits'],
    sampleQueries: [
      'How many credits can I register in summer term at Thapar?',
      'Can I clear my backlog in summer semester?',
      'What is the maximum course limit in TIET summer school?',
      'Summer term attendance requirements TIET'
    ],
    statuteLevel: 'Mandatory Procedure',
    authority: 'Dean of Academic Affairs (DOAA)',
    appealTemplate: {
      targetAuthority: 'The Dean of Academic Affairs (DOAA)\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Representation for Floating Course / Credit Exception in Summer Term under Statute § 9.1.4',
      bodySummary: 'Submitting request for registration / course allocation in the forthcoming Summer Term under the provisions of Section 9.1.4 to clear academic deficit within prescribed credit guidelines.',
      statuteReference: 'Section 9.1.4, Page 108, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-12-1-2',
    section: '§ 12.1.2',
    title: 'Anti-Ragging Zero Tolerance, Proctorial Inquiry & Student Safety Protections',
    category: 'Hostel & Campus Life',
    pageNumber: 142,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'Thapar Institute maintains an absolute Zero-Tolerance Policy toward any acts of ragging, intimidation, physical harassment, or psychological coercion in campus hostels, academic wings, or transport premises. Every complaint submitted to the Anti-Ragging Cell or Proctorial Committee must initiate a formal inquiry within twenty-four (24) hours, with provisional protective segregation granted to the complainant.',
    studentSummary:
      'TIET enforces 100% strict zero tolerance on any bullying or ragging. The Proctorial Committee is legally required to launch an inquiry within 24 hours of a complaint. Whistleblowers and victims receive immediate identity protection and physical safety safeguards.',
    keyConditions: [
      'Inquiry must commence within 24 hours of complaint receipt.',
      'Immediate protective segregation or room reassignment for complainant safety.',
      'Punitive sanctions include suspension, rustication, and filing of police FIR as per UGC and Supreme Court mandates.',
      'Anonymous reporting channels available via Proctorial Committee helpline.'
    ],
    actionSteps: [
      'Contact the Anti-Ragging Helpline or Proctorial Committee immediately (0175-2393000).',
      'Submit written or digital testimony to the Dean of Student Affairs (DOSA).',
      'Request immediate hostel relocation if residing near accused individuals.',
      'Receive official inquiry receipt and tracking reference.'
    ],
    tags: ['anti-ragging', 'ragging', 'proctorial committee', 'dosa', 'harassment', 'zero tolerance', 'student safety', 'grievance'],
    sampleQueries: [
      'What is the anti ragging policy at Thapar?',
      'How to report harassment or bullying in hostel?',
      'What happens when a ragging complaint is filed at TIET?',
      'Is my identity protected in a grievance complaint?'
    ],
    statuteLevel: 'Statutory Right',
    authority: 'Dean of Student Affairs (DOSA)',
    appealTemplate: {
      targetAuthority: 'The Dean of Student Affairs (DOSA) & Chairman, Proctorial Committee\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Formal Confidential Complaint under Anti-Ragging Statute § 12.1.2',
      bodySummary: 'Placing on formal record an urgent grievance under Section 12.1.2 of the Institute Regulations, requesting immediate proctorial intervention, safety segregation, and time-bound inquiry.',
      statuteReference: 'Section 12.1.2, Page 142, TIET Student Handbook'
    }
  },
  {
    id: 'tiet-reg-3-4-2',
    section: '§ 3.4.2',
    title: 'Semester Drop & Temporary Academic Withdrawal on Medical Grounds',
    category: 'Medical & Emergency',
    pageNumber: 38,
    documentName: 'TIET Academic Regulations & Student Handbook',
    verbatimClause:
      'A student incapacitated due to sustained major illness, critical surgical convalescence, or grave compassionate emergencies may apply to drop the ongoing semester without academic prejudice. Upon sanction by the Dean of Academic Affairs, the student is allowed to resume their degree trajectory in the subsequent equivalent semester without forfeiture of earned credits.',
    studentSummary:
      'If you face a major medical surgery or personal crisis making it impossible to continue classes, you do not have to fail all subjects. You can formally apply for a Semester Drop. Your previous credits stay intact and you rejoin the semester next year without penalty.',
    keyConditions: [
      'Application must be submitted prior to the commencement of EST.',
      'Requires medical board endorsement from a civil hospital or TIET health chief.',
      'Maximum total duration of degree program must not exceed 6 years (for 4-year BE/BTech).',
      'Tuition fee adjustment or carry-forward is governed by the Finance Committee directives.'
    ],
    actionSteps: [
      'Submit detailed medical documentation and parental consent letter.',
      'File the Semester Withdrawal Form at the Academic Section.',
      'Obtain no-dues clearance from Library and Hostel.',
      'Receive formal DOAA Sanction Order specifying return date.'
    ],
    tags: ['semester drop', 'academic withdrawal', 'leave of absence', 'medical drop', 'pause degree', 'gap semester'],
    sampleQueries: [
      'Can I take a semester off for medical reasons at Thapar?',
      'How to drop a semester at TIET without failing?',
      'What is the maximum time to complete BTech at TIET?',
      'What happens to my credits if I take medical withdrawal?'
    ],
    statuteLevel: 'Conditional Discretion',
    authority: 'Dean of Academic Affairs (DOAA)',
    appealTemplate: {
      targetAuthority: 'The Dean of Academic Affairs (DOAA)\nThapar Institute of Engineering & Technology, Patiala',
      subjectLine: 'Application for Temporary Semester Withdrawal under Statute § 3.4.2',
      bodySummary: 'Requesting permission for temporary semester withdrawal on substantiated medical/compassionate grounds as provided under Section 3.4.2, with preservation of academic standing.',
      statuteReference: 'Section 3.4.2, Page 38, TIET Student Handbook'
    }
  }
];

export const QUICK_TOPIC_FILTERS = [
  { label: 'All Statutes', query: '', icon: 'Scale' },
  { label: 'Competition Duty Leave', query: 'duty leave technical competition representation 4.2.1', icon: 'Award' },
  { label: 'Medical Leave 75%', query: 'medical certificate 5 days 75', icon: 'HeartPulse' },
  { label: 'Detention Grace Rules', query: 'detention 48 hours appeal 75 65', icon: 'ShieldAlert' },
  { label: 'EST Evaluation Contest', query: 'answer script re-evaluation marks', icon: 'FileSearch' },
  { label: 'Hostel Night Out', query: 'hostel curfew night out late entry', icon: 'Moon' },
  { label: 'Placement Duty Leave', query: 'placement interview cilp duty leave', icon: 'Briefcase' },
  { label: 'Makeup Exam (MST/EST)', query: 'makeup exam missed mst hospital', icon: 'GraduationCap' },
  { label: 'Summer Term Backlogs', query: 'summer semester 12 credits backlog', icon: 'Sun' },
];
