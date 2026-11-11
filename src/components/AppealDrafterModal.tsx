import React, { useState, useEffect } from 'react';
import type { RegulationStatute } from '../data/tietRegulations';
import { 
  X, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  FileText, 
  Building2, 
  Scale, 
  Edit3, 
  CheckCircle2,
  Trash2,
  Plus
} from 'lucide-react';

interface AppealDrafterModalProps {
  statute: RegulationStatute | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AppealDrafterModal: React.FC<AppealDrafterModalProps> = ({
  statute,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !statute) return null;

  // Form states
  const [studentName, setStudentName] = useState('Armaan Singh');
  const [rollNumber, setRollNumber] = useState('102203194');
  const [programYear, setProgramYear] = useState('B.E. Computer Engineering (3rd Year, Group COE-14)');
  const [department, setDepartment] = useState('Computer Science & Engineering (CSED)');
  const [targetAuthority, setTargetAuthority] = useState(statute.appealTemplate.targetAuthority);
  const [subjectLine, setSubjectLine] = useState(statute.appealTemplate.subjectLine);
  const [eventDetails, setEventDetails] = useState('Inter-University Technical Competition & Research Symposium at TIET Patiala');
  const [datesOfAbsence, setDatesOfAbsence] = useState('November 14, 2025 to November 16, 2025 (3 working days)');
  const [affectedSubjects, setAffectedSubjects] = useState('UCS505: Operating Systems, UCS507: Computer Networks, UCS509: Database Management Systems');
  const [enclosures, setEnclosures] = useState([
    '1. Official Event Invitation / Shortlist Email & Schedule',
    '2. Endorsement Slip signed by Faculty Mentor / Society President',
    '3. Webkiosk Lecture-by-Lecture Attendance Audit Sheet',
    '4. Copy of Student ID Card'
  ]);
  const [newEnclosure, setNewEnclosure] = useState('');
  
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');

  // Update defaults when statute changes
  useEffect(() => {
    if (statute) {
      setTargetAuthority(statute.appealTemplate.targetAuthority);
      setSubjectLine(statute.appealTemplate.subjectLine);
      if (statute.id === 'tiet-reg-5-1-3') {
        setEventDetails('Acute illness / Medical treatment at TIET Campus Health Centre');
        setDatesOfAbsence('November 04, 2025 to November 08, 2025');
        setEnclosures([
          '1. Original Medical Fitness Certificate endorsed by Campus Doctor',
          '2. Health Centre OPD Registration Voucher & Prescription Slips',
          '3. Webkiosk Attendance Record for the impacted period'
        ]);
      } else if (statute.id === 'tiet-reg-7-4-2') {
        setEventDetails('Erroneous provisional EST Detention List published on Webkiosk');
        setDatesOfAbsence('Semester End Examination (EST) November 2025');
        setEnclosures([
          '1. Certified Webkiosk Lecture Record showing biometric / duty discrepancy',
          '2. Sanctioned Duty Leave / Medical acknowledgment receipts',
          '3. Instructor Verification Sign-off'
        ]);
      }
    }
  }, [statute]);

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Construct official letter text
  const generatedLetter = `THAPAR INSTITUTE OF ENGINEERING & TECHNOLOGY
(Deemed to be University under Section 3 of UGC Act, 1956)
P.O. Box 32, Bhadson Road, Patiala - 147004, Punjab, India
OFFICE OF ACADEMIC & STUDENT AFFAIRS

Date: ${currentDate}
Ref: TIET/STUDENT-REP/${rollNumber}/${new Date().getFullYear()}

TO:
${targetAuthority}

THROUGH:
The Head of Department,
Department of ${department},
Thapar Institute of Engineering & Technology, Patiala.

SUBJECT: ${subjectLine.toUpperCase()}

Respected Sir / Madam,

I am writing this formal academic representation as a bona fide student of Thapar Institute of Engineering & Technology, enrolled in ${programYear}, holding Student Roll Number ${rollNumber}.

1. FACTUAL MATRIX & GROUNDS OF APPLICATION:
I was actively engaged in / affected by: "${eventDetails}" during the period from ${datesOfAbsence}. During this sanctioned interval, I was unable to attend regular instructional sessions in the following registered course(s):
${affectedSubjects}

2. STATUTORY INVOCATION & GOVERNING REGULATIONS:
I respectfully draw your kind attention to ${statute.section} of the official TIET Academic Regulations & Student Handbook (Page ${statute.pageNumber}), which unequivocally states:

   "${statute.verbatimClause}"

Pursuant to the aforesaid statutory provision, students representing the Institute in sanctioned competitive academic forums or suffering certified bona fide interruptions possess the recognized entitlement to institutional regularization and waiver.

3. PRAYER FOR RELIEF:
In light of the substantiated documentary evidence annexed herewith, I humbly pray that your esteemed office may be pleased to:
   (a) Grant formal approval and Attendance Duty Leave / Regularization for the lectures missed during ${datesOfAbsence};
   (b) Issue official directions to the concerned course instructors / Academic Webkiosk portal to record the missed sessions as "Present on Institutional Duty" / "Regularized Absence";
   (c) Ensure no academic penalty or wrongful detention is attracted in the aforesaid registered course(s).

I have maintained clean academic conduct and remain committed to academic excellence at TIET Patiala.

Thanking you in anticipation of your kind and expeditious intervention.

Yours respectfully,

(Signature)
_______________________________
Name: ${studentName}
Roll Number: ${rollNumber}
Program: ${programYear}
Department: ${department}
Contact: +91-98765-43210 | ${rollNumber.toLowerCase()}@thapar.edu

ANNEXURES / ENCLOSURES SUBMITTED:
${enclosures.map(enc => `[✓] ${enc}`).join('\n')}

CC TO:
1. Office of the Dean of Academic Affairs (DOAA), TIET Patiala.
2. Respective Course Instructors for immediate compliance record.
3. Personal Student Record Dossier.
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TIET_Appeal_${statute.section.replace(/[^a-zA-Z0-9]/g, '_')}_${rollNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Formal Academic Representation - ${rollNumber}</title>
          <style>
            body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; padding: 40px; color: #111; }
            pre { white-space: pre-wrap; font-family: 'Times New Roman', Times, serif; }
            .header { text-align: center; border-bottom: 2px solid #333; padding-bottom: 15px; margin-bottom: 20px; }
            .title { font-size: 15pt; font-weight: bold; }
          </style>
        </head>
        <body>
          <pre>${generatedLetter}</pre>
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleAddEnclosure = () => {
    if (newEnclosure.trim()) {
      setEnclosures([...enclosures, `${enclosures.length + 1}. ${newEnclosure.trim()}`]);
      setNewEnclosure('');
    }
  };

  const handleRemoveEnclosure = (idx: number) => {
    setEnclosures(enclosures.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-900 dark:bg-slate-800 text-amber-400 flex items-center justify-center shadow-2xs border border-transparent dark:border-slate-700">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-sans tracking-tight">
                  Formal Representation &amp; Petition Drafter
                </h3>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  {statute.section}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                Official memorandum drafting engine with verbatim TIET Academic Gazette citations
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Quick Meta */}
        <div className="px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-sans ${
                activeTab === 'preview'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              Institutional Letterhead Preview
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer font-sans ${
                activeTab === 'edit'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Configure Student &amp; Event Particulars
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer font-sans ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-slate-950 text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400 dark:text-slate-950" />
                  <span>1-Click Copy</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              title="Download as text file"
              className="p-2 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={handlePrint}
              title="Print formal representation letter"
              className="p-2 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-slate-50/50 dark:bg-slate-950/50">
          {activeTab === 'preview' ? (
            /* Pristine Letterhead Preview */
            <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs max-w-3xl mx-auto font-serif text-slate-900 dark:text-slate-100 text-xs sm:text-sm leading-relaxed relative">
              <div className="border-b-2 border-slate-900 dark:border-slate-700 pb-4 mb-5 text-center font-sans">
                <h4 className="font-extrabold text-sm sm:text-base tracking-wide text-slate-900 dark:text-white uppercase">
                  Thapar Institute of Engineering &amp; Technology
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  (Deemed to be University under Section 3 of UGC Act, 1956) • Patiala, Punjab
                </p>
                <div className="inline-block mt-2 font-mono text-[10px] uppercase font-bold tracking-widest text-slate-900 dark:text-amber-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded border border-slate-200 dark:border-slate-700">
                  Formal Academic Representation &amp; Statute Invocation
                </div>
              </div>

              {/* Preformatted Letter Text */}
              <div className="font-mono text-[11px] sm:text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed select-all">
                {generatedLetter}
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-sans text-slate-500 dark:text-slate-400">
                <span>Generated by SyllabusGPT • TIET Academic Regulations Corpus</span>
                <span className="font-mono text-slate-900 dark:text-amber-400 font-semibold">{statute.section} Verified</span>
              </div>
            </div>
          ) : (
            /* Edit Form Fields */
            <div className="max-w-2xl mx-auto space-y-4 font-sans">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Student Particulars:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Full Student Name</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-400 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Roll Number</label>
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-900 dark:focus:ring-amber-400 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Program &amp; Year</label>
                    <input
                      type="text"
                      value={programYear}
                      onChange={(e) => setProgramYear(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Department</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              {/* Event & Subject Details */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Event &amp; Reason Particulars:
                </h4>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Event / Ground of Absence</label>
                  <input
                    type="text"
                    value={eventDetails}
                    onChange={(e) => setEventDetails(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Dates of Absence</label>
                    <input
                      type="text"
                      value={datesOfAbsence}
                      onChange={(e) => setDatesOfAbsence(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Target Authority</label>
                    <input
                      type="text"
                      value={targetAuthority}
                      onChange={(e) => setTargetAuthority(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Impacted Courses / Subjects</label>
                  <textarea
                    rows={2}
                    value={affectedSubjects}
                    onChange={(e) => setAffectedSubjects(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                  />
                </div>
              </div>

              {/* Annexures / Enclosures Manager */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <FileText className="w-4 h-4 text-amber-600" />
                  Annexures &amp; Supporting Documents:
                </h4>
                <div className="space-y-2">
                  {enclosures.map((enc, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <span>{enc}</span>
                      <button
                        onClick={() => handleRemoveEnclosure(idx)}
                        className="text-slate-400 hover:text-rose-600 transition-colors p-1"
                        title="Remove annexure"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    value={newEnclosure}
                    onChange={(e) => setNewEnclosure(e.target.value)}
                    placeholder="Add custom annexure (e.g. Flight ticket, Doctor prescription)..."
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddEnclosure();
                      }
                    }}
                  />
                  <button
                    onClick={handleAddEnclosure}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
