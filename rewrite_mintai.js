const fs = require('fs');

let content = fs.readFileSync('src/app/mintai/page.tsx', 'utf8');

// Add import for CURRICULUM
content = content.replace('import { BackendCourse, PredictionResponse, ExamDNAAnalysis, BackendPrediction } from "@/lib/types";', 'import { BackendCourse, PredictionResponse, ExamDNAAnalysis, BackendPrediction } from "@/lib/types";\nimport { CURRICULUM } from "@/lib/curriculumData";');

// State updates
const stateReplacement = 
  const [selectedBranch, setSelectedBranch] = useState("Computer Science and Engineering");
  const [selectedSemester, setSelectedSemester] = useState("1");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  
  const branches = Object.keys(CURRICULUM).sort();
  const semesters = CURRICULUM[selectedBranch] ? Object.keys(CURRICULUM[selectedBranch]).sort((a,b)=>parseInt(a)-parseInt(b)) : [];
  const subjects = CURRICULUM[selectedBranch]?.[selectedSemester] || [];
  
  const exams = ["CT1", "CT2", "CT3", "CT4", "END SEM"];
;

content = content.replace(/const \[courses, setCourses\][\s\S]*?const \[selectedCourse, setSelectedCourse\] = useState\(""\);/, stateReplacement);

// Handle analyze function update
content = content.replace(/const courseObj = courses\.find[\s\S]*?const subject = [^;]*;/, 'const subject = selectedCourse;');
content = content.replace(/getExamDNA\(selectedCourse\)/, 'getExamDNA(selectedCourse)'); // already correct

// Remove useEffect for getCourses
content = content.replace(/useEffect\(\(\) => \{[\s\S]*?\}, \[\]\);/, '');

// Replace the form
const newForm = 
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Select Branch
                </label>
                <select 
                  value={selectedBranch}
                  onChange={(e) => { setSelectedBranch(e.target.value); setSelectedSemester("1"); setSelectedCourse(""); }}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors appearance-none mb-4"
                >
                  {branches.map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>

                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Select Semester
                </label>
                <select 
                  value={selectedSemester}
                  onChange={(e) => { setSelectedSemester(e.target.value); setSelectedCourse(""); }}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors appearance-none mb-4"
                >
                  <option value="" disabled>Select a semester</option>
                  {semesters.map(s => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>

                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Select Course
                </label>
                <select 
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors appearance-none mb-4"
                >
                  <option value="" disabled>Select a course</option>
                  {subjects.map((c: any) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                  Select Examination
                </label>
                <select 
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="" disabled>Select an exam</option>
                  {exams.map(ex => (
                    <option key={ex} value={ex}>{ex}</option>
                  ))}
                </select>
              </div>

              <button 
                type="submit"
                disabled={!selectedCourse || !selectedExam || isAnalyzing}
;

content = content.replace(/<div>\s*<label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">\s*Select Course\s*<\/label>[\s\S]*?<button\s*type="submit"\s*disabled=\{!selectedCourse \|\| isAnalyzing\}/, newForm);

fs.writeFileSync('src/app/mintai/page.tsx', content);
